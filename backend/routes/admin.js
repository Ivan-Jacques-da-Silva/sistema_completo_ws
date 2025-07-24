const express = require('express');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const { registrarHistorico } = require('../middleware/auditoria');
const { authenticateAdmin } = require('../middleware/auth');

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

// Listar salas para admin
router.get('/salas', authenticateAdmin, async (req, res) => {
  try {
    console.log('🔍 Admin solicitando salas...');

    const { page = 1, limit = 100, search = '', disponivel } = req.query;
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
        // take: parseInt(limit),
        orderBy: [
          { andar: 'asc' },
          { numero: 'desc' }
        ]
      }),
      prisma.sala.count({ where })
    ]);

    // console.log(`✅ Admin: ${salas.length} salas encontradas`);

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
    console.error('❌ Erro ao buscar salas (admin):', error);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro ao buscar salas: ' + error.message
    });
  }
});

// Alias para listagem de salas (compatibilidade)
router.get('/salas-list', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', disponivel } = req.query;

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

// Criar nova sala
router.post('/salas', authenticateAdmin, upload.fields([
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

    // Registrar no histórico
    await registrarHistorico(req, 'CREATE', 'salas', sala.id, null, dadosSala);

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
router.put('/salas/:id', authenticateAdmin, upload.fields([
  { name: 'imagem', maxCount: 1 },
  { name: 'planta', maxCount: 1 },
  { name: 'proposta_pdf', maxCount: 1 }
]), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      numero, andar, nome, area, posicao, preco, disponivel
    } = req.body;

    // Log da operação iniciada
    const fs = require('fs');
    const logOperation = (operation, req, data = {}) => {
      const timestamp = new Date().toISOString();
      const route = req ? `${req.method} ${req.path}` : 'SYSTEM';
      const ip = req ? (req.ip || req.connection.remoteAddress) : 'UNKNOWN';

      const logEntry = `[${timestamp}] ${route} - ${operation} - IP: ${ip} - Data: ${JSON.stringify(data)}\n`;

      if (!fs.existsSync('logs')) {
        fs.mkdirSync('logs');
      }

      const logFile = `logs/operations-${new Date().toISOString().split('T')[0]}.log`;
      fs.appendFileSync(logFile, logEntry);
    };

    logOperation('SALA_UPDATE_INICIADO', req, { salaId: id, dados: req.body });

    // Buscar dados antes da alteração
    const salaAntes = await prisma.sala.findUnique({
      where: { id: parseInt(id) }
    });

    if (!salaAntes) {
      logOperation('SALA_UPDATE_ERRO', req, { erro: 'Sala não encontrada', salaId: id });
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
      where: { id: salaAntes.id },
      data: updateData
    });

    // Registrar no histórico
    await registrarHistorico(req, 'UPDATE', 'salas', sala.id, salaAntes, updateData);

    logOperation('SALA_UPDATE_SUCESSO', req, { salaId: sala.id, nome: sala.nome });

    res.json({ 
      sucesso: true, 
      mensagem: 'Sala atualizada com sucesso!',
      data: sala
    });
  } catch (error) {
    // Log detalhado do erro
    const fs = require('fs');
    const timestamp = new Date().toISOString();
    const logEntry = `
[${timestamp}] PUT /api/admin/salas/${req.params.id}
IP: ${req.ip || req.connection.remoteAddress}
ERROR: ${error.message}
Stack: ${error.stack}
Body: ${JSON.stringify(req.body, null, 2)}
${'='.repeat(80)}
`;

    if (!fs.existsSync('logs')) {
      fs.mkdirSync('logs');
    }

    fs.appendFileSync(`logs/error-${new Date().toISOString().split('T')[0]}.log`, logEntry);

    console.error('Erro ao atualizar sala:', error);

    // Resposta amigável para o frontend
    let mensagem = 'Erro ao atualizar sala';

    if (error.message.includes('Unknown argument')) {
      mensagem = 'Erro de validação dos dados da sala';
    } else if (error.code === 'P2002') {
      mensagem = 'Já existe uma sala com estes dados';
    }

    res.status(500).json({ 
      sucesso: false, 
      mensagem,
      codigo: 'SALA_UPDATE_ERROR',
      timestamp: new Date().toISOString()
    });
  }
});

// Deletar sala
router.delete('/salas/:id', authenticateAdmin, async (req, res) => {
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

    // Registrar no histórico
    await registrarHistorico(req, 'DELETE', 'salas', parseInt(id), sala, null);

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

// Buscar histórico de alterações
router.get('/historico', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, tabela, operacao } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (tabela) where.tabela = tabela;
    if (operacao) where.operacao = operacao;

    const [historico, total] = await Promise.all([
      prisma.historicoAlteracoes.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.historicoAlteracoes.count({ where })
    ]);

    res.json({ 
      sucesso: true, 
      data: historico,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro ao buscar histórico: ' + error.message
    });
  }
});

module.exports = router;