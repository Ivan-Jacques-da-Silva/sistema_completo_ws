const express = require('express');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const { registrarHistorico } = require('../middleware/auditoria');

const router = express.Router();
const prisma = new PrismaClient();

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// GET /api/salas - Buscar todas as salas
router.get('/', async (req, res) => {
  try {
    const salas = await prisma.sala.findMany({
      orderBy: [
        { andar: 'asc' },
        { numero: 'desc' }
      ]
    });

    // Estrutura para compatibilidade com o frontend existente
    const produtos = [{
      variacoes: []
    }];

    // Agrupar salas por andar
    const andares = {};
    salas.forEach(sala => {
      if (!andares[sala.andar]) {
        andares[sala.andar] = {
          id: sala.andar,
          atributos: {
            andar: [{ valor: sala.andar }]
          },
          variacoes: []
        };
      }

      andares[sala.andar].variacoes.push({
        id: sala.id,
        atributos: {
          nome: [{ valor: sala.nome }],
          area: [{ valor: sala.area.toString() }],
          posicao: [{ valor: sala.posicao }],
          disponibilidade: [{ valor: sala.disponivel }]
        },
        precos: {
          de: [{ valor: sala.preco }]
        },
        arquivos: {
          imagens: sala.imagem ? [{ baixar: `/uploads/${sala.imagem}` }] : [{ baixar: '/uploads/seedImg/sala1.png' }],
          plantas: sala.planta ? [{ baixar: `/uploads/${sala.planta}` }] : [{ baixar: '/uploads/seedPlanta/planta-sala-1.png' }],
          proposta_pdf: sala.proposta_pdf ? [{ baixar: `/uploads/${sala.proposta_pdf}` }] : []
        }
      });
    });

    // Converter para array e ordenar
    produtos[0].variacoes = Object.values(andares).sort((a, b) => 
      a.atributos.andar[0].valor - b.atributos.andar[0].valor
    );

    res.json({
      sucesso: true,
      produtos
    });

  } catch (error) {
    console.error('Erro ao buscar salas:', error);
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno do servidor',
      erro: error.message
    });
  }
});

// GET /api/salas/list - Lista simples de salas
router.get('/list', async (req, res) => {
  try {
    const salas = await prisma.sala.findMany({
      orderBy: [
        { andar: 'asc' },
        { numero: 'desc' }
      ]
    });

    res.json({
      sucesso: true,
      data: salas
    });

  } catch (error) {
    console.error('Erro ao buscar lista de salas:', error);
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno do servidor'
    });
  }
});

// Buscar sala específica
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sala = await prisma.sala.findUnique({
      where: { id: parseInt(id) }
    });

    if (!sala) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Sala não encontrada'
      });
    }

    res.json({ sucesso: true, data: sala });
  } catch (error) {
    console.error('Erro ao buscar sala:', error);
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno do servidor'
    });
  }
});

// Criar nova sala (público para formulários)
router.post('/', upload.fields([
  { name: 'imagem', maxCount: 1 },
  { name: 'planta', maxCount: 1 },
  { name: 'proposta_pdf', maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      numero, andar, nome, area, posicao, preco, disponivel
    } = req.body;

    const imagemFile = req.files?.imagem?.[0];
    const plantaFile = req.files?.planta?.[0];
    const propostaPdfFile = req.files?.proposta_pdf?.[0];

    const dadosSala = {
      numero,
      andar: parseInt(andar),
      nome,
      area: parseFloat(area),
      posicao,
      preco: parseFloat(preco),
      disponivel: disponivel === 'true' || disponivel === true,
      imagem: imagemFile?.filename,
      planta: plantaFile?.filename,
      proposta_pdf: propostaPdfFile?.filename
    };

    const sala = await prisma.sala.create({
      data: dadosSala
    });

    res.json({ 
      sucesso: true, 
      mensagem: 'Sala criada com sucesso!',
      data: sala
    });
  } catch (error) {
    console.error('Erro ao criar sala:', error);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro ao criar sala: ' + error.message
    });
  }
});

// Atualizar sala
router.put('/:id', upload.fields([
  { name: 'imagem', maxCount: 1 },
  { name: 'planta', maxCount: 1 },
  { name: 'proposta_pdf', maxCount: 1 }
]), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      numero, andar, nome, area, posicao, preco, disponivel
    } = req.body;

    const salaExistente = await prisma.sala.findUnique({
      where: { id: parseInt(id) }
    });

    if (!salaExistente) {
      return res.status(404).json({ 
        sucesso: false, 
        mensagem: 'Sala não encontrada' 
      });
    }

    const imagemFile = req.files?.imagem?.[0];
    const plantaFile = req.files?.planta?.[0];
    const propostaPdfFile = req.files?.proposta_pdf?.[0];

    const updateData = {
      numero: String(numero),
      andar: parseInt(andar),
      nome: String(nome),
      area: parseFloat(area),
      posicao: String(posicao || ''),
      preco: parseFloat(preco),
      disponivel: disponivel === 'true' || disponivel === true
    };

    if (imagemFile) updateData.imagem = imagemFile.filename;
    if (plantaFile) updateData.planta = plantaFile.filename;
    if (propostaPdfFile) updateData.proposta_pdf = propostaPdfFile.filename;

    const sala = await prisma.sala.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    res.json({ 
      sucesso: true, 
      mensagem: 'Sala atualizada com sucesso!',
      data: sala
    });
  } catch (error) {
    console.error('Erro ao atualizar sala:', error);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro ao atualizar sala: ' + error.message
    });
  }
});

// Deletar sala
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sala = await prisma.sala.findUnique({
      where: { id: parseInt(id) }
    });

    if (!sala) {
      return res.status(404).json({ 
        sucesso: false, 
        mensagem: 'Sala não encontrada' 
      });
    }

    await prisma.sala.delete({
      where: { id: parseInt(id) }
    });

    res.json({ 
      sucesso: true, 
      mensagem: 'Sala deletada com sucesso!' 
    });
  } catch (error) {
    console.error('Erro ao deletar sala:', error);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro ao deletar sala: ' + error.message
    });
  }
});

module.exports = router;