import express, { Request, Response } from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import { registrarHistorico } from '../middleware/auditoria';
import { authenticateAdmin } from '../middleware/auth';
import path from 'path';

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

// Interfaces
interface SalaData {
  numero: string;
  andar: number;
  nome: string;
  area: number;
  posicao: string;
  orientacao?: string;
  preco: number;
  disponivel: boolean;
  valorizacao?: number;
  lucro?: number;
  aluguel?: number;
  condominio?: number;
  iptu?: number;
}

interface HistoricoQuery {
  page?: string;
  limit?: string;
  tabela?: string;
  operacao?: string;
}

// Listar todas as salas (admin)
router.get('/salas', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const salas = await prisma.sala.findMany({
      orderBy: [
        { andar: 'asc' },
        { numero: 'asc' }
      ]
    });

    res.json({ 
      sucesso: true, 
      data: salas
    });
  } catch (error) {
    console.error('Erro ao buscar salas:', error);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro ao buscar salas: ' + (error as Error).message
    });
  }
});

// Criar nova sala
router.post('/salas', authenticateAdmin, upload.fields([
  { name: 'imagem', maxCount: 1 },
  { name: 'planta', maxCount: 1 }
]), async (req: Request, res: Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const salaData: SalaData = req.body;

    // Converter strings para números
    salaData.andar = parseInt(salaData.andar as any);
    salaData.area = parseFloat(salaData.area as any);
    salaData.preco = parseFloat(salaData.preco as any);
    salaData.disponivel = Boolean(salaData.disponivel === true || String(salaData.disponivel) === 'true');

    if (salaData.valorizacao) salaData.valorizacao = parseFloat(salaData.valorizacao as any);
    if (salaData.lucro) salaData.lucro = parseFloat(salaData.lucro as any);
    if (salaData.aluguel) salaData.aluguel = parseFloat(salaData.aluguel as any);
    if (salaData.condominio) salaData.condominio = parseFloat(salaData.condominio as any);
    if (salaData.iptu) salaData.iptu = parseFloat(salaData.iptu as any);

    const dataToSave: any = { ...salaData };

    if (files.imagem) {
      dataToSave.imagem = files.imagem[0].filename;
    }

    if (files.planta) {
      dataToSave.planta = files.planta[0].filename;
    }

    const novaSala = await prisma.sala.create({
      data: dataToSave
    });

    // Registrar no histórico
    await registrarHistorico(req, 'CREATE', 'salas', novaSala.id, null, dataToSave);

    res.json({ 
      sucesso: true, 
      mensagem: 'Sala criada com sucesso!',
      data: novaSala
    });
  } catch (error) {
    console.error('Erro ao criar sala:', error);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro ao criar sala: ' + (error as Error).message
    });
  }
});

// Atualizar sala
router.put('/salas/:id', authenticateAdmin, upload.fields([
  { name: 'imagem', maxCount: 1 },
  { name: 'planta', maxCount: 1 }
]), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Buscar sala atual para comparação
    const salaAtual = await prisma.sala.findUnique({
      where: { id: parseInt(id) }
    });

    if (!salaAtual) {
      return res.status(404).json({ 
        sucesso: false, 
        mensagem: 'Sala não encontrada' 
      });
    }

    const salaData: any = req.body;

    // Converter strings para números
    if (salaData.andar) salaData.andar = parseInt(salaData.andar);
    if (salaData.area) salaData.area = parseFloat(salaData.area);
    if (salaData.preco) salaData.preco = parseFloat(salaData.preco);
    if (salaData.disponivel !== undefined) salaData.disponivel = Boolean(salaData.disponivel === true || String(salaData.disponivel) === 'true');
    if (salaData.valorizacao) salaData.valorizacao = parseFloat(salaData.valorizacao);
    if (salaData.lucro) salaData.lucro = parseFloat(salaData.lucro);
    if (salaData.aluguel) salaData.aluguel = parseFloat(salaData.aluguel);
    if (salaData.condominio) salaData.condominio = parseFloat(salaData.condominio);
    if (salaData.iptu) salaData.iptu = parseFloat(salaData.iptu);

    if (files.imagem) {
      salaData.imagem = files.imagem[0].filename;
    }

    if (files.planta) {
      salaData.planta = files.planta[0].filename;
    }

    const salaAtualizada = await prisma.sala.update({
      where: { id: parseInt(id) },
      data: salaData
    });

    // Registrar no histórico
    await registrarHistorico(req, 'UPDATE', 'salas', parseInt(id), salaAtual, salaData);

    res.json({ 
      sucesso: true, 
      mensagem: 'Sala atualizada com sucesso!',
      data: salaAtualizada
    });
  } catch (error) {
    console.error('Erro ao atualizar sala:', error);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro ao atualizar sala: ' + (error as Error).message
    });
  }
});

// Deletar sala
router.delete('/salas/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Buscar sala antes de deletar
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
      mensagem: 'Erro ao deletar sala: ' + (error as Error).message
    });
  }
});

// Buscar histórico de alterações
router.get('/historico', authenticateAdmin, async (req: Request<{}, any, any, HistoricoQuery>, res: Response) => {
  try {
    const { page = '1', limit = '20', tabela, operacao } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where: any = {};
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
      mensagem: 'Erro ao buscar histórico: ' + (error as Error).message
    });
  }
});

export default router;