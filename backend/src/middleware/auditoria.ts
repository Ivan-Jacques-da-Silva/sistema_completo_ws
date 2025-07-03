
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Interfaces
interface HistoricoData {
  tabela: string;
  operacao: string;
  registro_id?: number | null;
  dados_antes?: any;
  dados_depois?: any;
  usuario: string;
  ip_address: string;
  user_agent: string;
}

// Função para registrar alterações no histórico
export const registrarHistorico = async (
  req: Request, 
  operacao: string, 
  tabela: string, 
  registroId: number | null = null, 
  dadosAntes: any = null, 
  dadosDepois: any = null
): Promise<void> => {
  try {
    await prisma.historicoAlteracoes.create({
      data: {
        tabela,
        operacao,
        registro_id: registroId,
        dados_antes: dadosAntes,
        dados_depois: dadosDepois,
        usuario: 'admin', // Por enquanto fixo, pode ser expandido com JWT
        ip_address: req.ip || req.socket.remoteAddress || 'UNKNOWN',
        user_agent: req.headers['user-agent'] || 'UNKNOWN'
      }
    });
  } catch (error) {
    console.error('Erro ao registrar histórico:', error);
  }
};

// Middleware para interceptar operações do Prisma
export const auditarOperacao = (req: Request, res: Response, next: NextFunction): void => {
  (req as any).registrarHistorico = registrarHistorico;
  next();
};
