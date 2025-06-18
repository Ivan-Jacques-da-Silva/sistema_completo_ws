
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { registrarHistorico } from '../middleware/auditoria';
import { authenticateAdmin } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Interfaces
interface PreReservaData {
  nome: string;
  cpf_cnpj: string;
  contato: string;
  email: string;
}

interface ContrapropostaData extends PreReservaData {
  proposta: string;
}

interface AgendamentoData extends PreReservaData {
  data: string;
  hora: string;
}

// Pré-Reserva
router.post('/pre-reserva', async (req: Request<{}, any, PreReservaData>, res: Response) => {
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
router.post('/contraproposta', async (req: Request<{}, any, ContrapropostaData>, res: Response) => {
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
router.post('/agendar-reuniao', async (req: Request<{}, any, AgendamentoData>, res: Response) => {
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
router.get('/pre-reservas', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const preReservas = await prisma.preReserva.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({ 
      sucesso: true, 
      data: preReservas
    });
  } catch (error) {
    console.error('Erro ao buscar pré-reservas:', error);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro interno do servidor' 
    });
  }
});

router.get('/contrapropostas', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const contrapropostas = await prisma.contraproposta.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({ 
      sucesso: true, 
      data: contrapropostas
    });
  } catch (error) {
    console.error('Erro ao buscar contrapropostas:', error);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro interno do servidor' 
    });
  }
});

router.get('/agendamentos', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const agendamentos = await prisma.agendamentoReuniao.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({ 
      sucesso: true, 
      data: agendamentos
    });
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro interno do servidor' 
    });
  }
});

export default router;
