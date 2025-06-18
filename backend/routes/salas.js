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

// Buscar todas as salas (público)
router.get('/', async (req, res) => {
  try {
    const { andar } = req.query;

    const where = andar ? { andar: parseInt(andar) } : {};

    const salas = await prisma.sala.findMany({
      where,
      orderBy: [
        { andar: 'asc' },
        { numero: 'asc' }
      ]
    });

    if (salas.length === 0) {
      return res.json({
        produtos: [{
          variacoes: []
        }]
      });
    }

    const andares = {};
    salas.forEach(sala => {
      if (!andares[sala.andar]) {
        andares[sala.andar] = [];
      }
      andares[sala.andar].push({
        id: sala.id,
        atributos: {
          nome: [{ valor: sala.nome }],
          area: [{ valor: sala.area.toString() }],
          posicao: [{ valor: sala.posicao }],
          disponibilidade: [{ valor: sala.disponivel }]
        },
        precos: {
          de: [{ valor: sala.preco.toString() }]
        },
        arquivos: {
          imagens: sala.imagem ? [{ baixar: `/uploads/seedImg/${sala.imagem}` }] : [],
          plantas: sala.planta ? [{ baixar: `/uploads/seedPlanta/${sala.planta}` }] : []
        }
      });
    });

    const resposta = {
      produtos: [{
        variacoes: Object.entries(andares).map(([andar, variacoes]) => ({
          atributos: {
            andar: [{ valor: andar }]
          },
          variacoes
        }))
      }]
    };

    res.json(resposta);
  } catch (error) {
    console.error('Erro ao buscar salas:', error);
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno do servidor'
    });
  }
});

// Buscar todas as salas (formato simples para admin)
router.get('/list', async (req, res) => {
  try {
    const { page = 1, limit = 50, search = '', disponivel } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};

    if (search) {
      where.OR = [
        { nome: { contains: search, mode: 'insensitive' } },
        { numero: { contains: search, mode: 'insensitive' } },
        { posicao: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (disponivel !== undefined) {
      where.disponivel = disponivel === 'true';
    }

    const [salas, total] = await Promise.all([
      prisma.sala.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: [
          { andar: 'asc' },
          { numero: 'asc' }
        ]
      }),
      prisma.sala.count({ where })
    ]);

    res.json({ 
      sucesso: true, 
      data: salas,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Erro ao buscar salas:', error);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro ao buscar salas: ' + error.message
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
  { name: 'planta', maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      numero, andar, nome, area, posicao, orientacao, preco, disponivel
    } = req.body;

    const imagemFile = req.files?.imagem?.[0];
    const plantaFile = req.files?.planta?.[0];

    const dadosSala = {
      numero,
      andar: parseInt(andar),
      nome,
      area: parseFloat(area),
      posicao: posicao || orientacao,
      orientacao: orientacao || posicao,
      preco: parseFloat(preco),
      disponivel: disponivel === 'true' || disponivel === true,
      imagem: imagemFile?.filename,
      planta: plantaFile?.filename
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
  { name: 'planta', maxCount: 1 }
]), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      numero, andar, nome, area, posicao, orientacao, preco, disponivel
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

    const updateData = {
      numero,
      andar: parseInt(andar),
      nome,
      area: parseFloat(area),
      posicao: posicao || orientacao,
      preco: parseFloat(preco),
      disponivel: disponivel === 'true' || disponivel === true
    };

    if (orientacao) {
      updateData.orientacao = orientacao;
    }

    if (imagemFile) updateData.imagem = imagemFile.filename;
    if (plantaFile) updateData.planta = plantaFile.filename;

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
