const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { registrarHistorico } = require('../middleware/auditoria');
const { authenticateAdmin } = require('../middleware/auth');
const { enviarNotificacaoContraproposta, enviarNotificacaoAgendamento } = require('../utils/email');

const router = express.Router();
const prisma = new PrismaClient();

// Middleware para parsing JSON
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Listar pré-reservas
router.get('/pre-reservas', async (req, res) => {
  try {
    const preReservas = await prisma.preReserva.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ sucesso: true, data: preReservas });
  } catch (error) {
    console.error('Erro ao buscar pré-reservas:', error);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor' });
  }
});

// Listar contrapropostas
router.get('/contrapropostas', async (req, res) => {
  try {
    const contrapropostas = await prisma.contraproposta.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ sucesso: true, data: contrapropostas });
  } catch (error) {
    console.error('Erro ao buscar contrapropostas:', error);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor' });
  }
});

// Listar agendamentos
router.get('/agendamentos', async (req, res) => {
  try {
    const agendamentos = await prisma.agendamentoReuniao.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ sucesso: true, data: agendamentos });
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor' });
  }
});

// Criar pré-reserva
router.post('/pre-reserva', async (req, res) => {
  try {
    const { nome, cpf_cnpj, contato, email } = req.body;

    if (!nome || !cpf_cnpj || !contato || !email) {
      return res.status(400).json({ 
        sucesso: false, 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }

    const preReserva = await prisma.preReserva.create({
      data: { nome, cpf_cnpj, contato, email }
    });

    // Registrar no histórico
    await registrarHistorico(req, 'CREATE', 'pre_reservas', preReserva.id, null, { nome, cpf_cnpj, contato, email });

    res.json({ 
      sucesso: true, 
      mensagem: 'Pré-reserva enviada com sucesso!',
      data: preReserva
    });
  } catch (error) {
    console.error('Erro ao criar pré-reserva:', error);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro interno do servidor' 
    });
  }
});

// Contraproposta
router.post('/contraproposta', async (req, res) => {
  try {
    const { nome, cpf_cnpj, contato, email, proposta } = req.body;

    if (!nome || !cpf_cnpj || !contato || !email || !proposta) {
      return res.status(400).json({ 
        sucesso: false, 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }

    const contraproposta = await prisma.contraproposta.create({
      data: { nome, cpf_cnpj, contato, email, proposta }
    });

    // Registrar no histórico
    await registrarHistorico(req, 'CREATE', 'contrapropostas', contraproposta.id, null, { nome, cpf_cnpj, contato, email, proposta });

    // Enviar notificação por email
    await enviarNotificacaoContraproposta({ nome, cpf_cnpj, contato, email, proposta });

    res.json({ 
      sucesso: true, 
      mensagem: 'Contraproposta enviada com sucesso!',
      data: contraproposta
    });
  } catch (error) {
    console.error('Erro ao criar contraproposta:', error);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro interno do servidor' 
    });
  }
});

// Agendamento de Reunião
router.post('/agendar-reuniao', async (req, res) => {
  try {
    const { nome, cpf_cnpj, contato, email, data, hora } = req.body;

    if (!nome || !cpf_cnpj || !contato || !email || !data || !hora) {
      return res.status(400).json({ 
        sucesso: false, 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }

    const agendamento = await prisma.agendamentoReuniao.create({
      data: { nome, cpf_cnpj, contato, email, data, hora }
    });

    // Registrar no histórico
    await registrarHistorico(req, 'CREATE', 'agendamentos_reuniao', agendamento.id, null, { nome, cpf_cnpj, contato, email, data, hora });

    // Enviar notificação por email
    await enviarNotificacaoAgendamento({ nome, cpf_cnpj, contato, email, data, hora });

    res.json({ 
      sucesso: true, 
      mensagem: 'Reunião agendada com sucesso!',
      data: agendamento
    });
  } catch (error) {
    console.error('Erro ao agendar reunião:', error);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro interno do servidor' 
    });
  }
});

// Rotas administrativas para visualizar formulários

// Listar pré-reservas para admin
router.get('/admin/pre-reservas', authenticateAdmin, async (req, res) => {
  try {
    const preReservas = await prisma.preReserva.findMany({
      include: {
        sala: {
          select: {
            id: true,
            numero: true,
            nome: true,
            andar: true,
            preco: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ sucesso: true, data: preReservas });
  } catch (error) {
    console.error('Erro ao buscar pré-reservas (admin):', error);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor' });
  }
});

// Listar todas as contrapropostas (ADMIN)
router.get('/admin/contrapropostas', authenticateAdmin, async (req, res) => {
  try {
    const contrapropostas = await prisma.contraproposta.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ sucesso: true, data: contrapropostas });
  } catch (error) {
    console.error('Erro ao buscar contrapropostas (admin):', error);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor' });
  }
});

// Listar todos os agendamentos (ADMIN)
router.get('/admin/agendamentos', authenticateAdmin, async (req, res) => {
  try {
    const agendamentos = await prisma.agendamentoReuniao.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ sucesso: true, data: agendamentos });
  } catch (error) {
    console.error('Erro ao buscar agendamentos (admin):', error);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor' });
  }
});

// Marcar pré-reserva como visualizada
router.put('/admin/pre-reservas/:id/visualizar', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const preReserva = await prisma.preReserva.update({
      where: { id: parseInt(id) },
      data: { visualizado: true }
    });

    // Registrar no histórico
    await registrarHistorico(req, 'UPDATE', 'pre_reservas', parseInt(id), { visualizado: false }, { visualizado: true });

    res.json({ sucesso: true, data: preReserva });
  } catch (error) {
    console.error('Erro ao atualizar pré-reserva:', error);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor' });
  }
});

// Marcar contraproposta como visualizada
router.put('/admin/contrapropostas/:id/visualizar', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const contraproposta = await prisma.contraproposta.update({
      where: { id: parseInt(id) },
      data: { visualizado: true }
    });

    // Registrar no histórico
    await registrarHistorico(req, 'UPDATE', 'contrapropostas', parseInt(id), { visualizado: false }, { visualizado: true });

    res.json({ sucesso: true, data: contraproposta });
  } catch (error) {
    console.error('Erro ao atualizar contraproposta:', error);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor' });
  }
});

// Marcar agendamento como visualizado
router.put('/admin/agendamentos/:id/visualizar', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const agendamento = await prisma.agendamentoReuniao.update({
      where: { id: parseInt(id) },
      data: { visualizado: true }
    });

    // Registrar no histórico
    await registrarHistorico(req, 'UPDATE', 'agendamentos_reuniao', parseInt(id), { visualizado: false }, { visualizado: true });

    res.json({ sucesso: true, data: agendamento });
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor' });
  }
});

module.exports = router;