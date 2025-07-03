
import express, { Request, Response } from 'express';

const router = express.Router();

// Importar todas as rotas modulares
import salasRoutes from './salas';
import adminRoutes from './admin';
import formulariosRoutes from './formularios';
import authRoutes from './auth';

// Configurar as rotas principais sem prefixo /api
// Rota para gerenciamento de salas (público e admin)
router.use('/salas', salasRoutes);

// Rota para funcionalidades administrativas (protegida)
router.use('/admin', adminRoutes);

// Rota para formulários de contato e propostas (público)
router.use('/formularios', formulariosRoutes);

// Rota para autenticação de usuários (público)
router.use('/auth', authRoutes);

// Rota de verificação de status da API
router.get('/status', (req: Request, res: Response) => {
  res.json({ 
    status: 'online', 
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Token CSRF para compatibilidade com sistemas antigos
router.get('/csrf-token', (req: Request, res: Response) => {
  res.json({ csrfToken: 'dummy-token' });
});

export default router;
