
import express, { Request, Response } from 'express';
import { generateSecureToken, invalidateToken } from '../middleware/auth';

const router = express.Router();

interface LoginData {
  usuario: string;  // Mudado de username para usuario para consistência
  senha: string;    // Mudado de password para senha
}

// Rota de login - Autentica usuário e retorna token
router.post('/login', (req: Request<{}, any, LoginData>, res: Response) => {
  try {
    const { usuario, senha } = req.body;

    // Validação de entrada
    if (!usuario || !senha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Usuário e senha são obrigatórios',
        codigo: 'MISSING_CREDENTIALS'
      });
    }

    // Validação simples (em produção, usar hash bcrypt e banco de dados)
    if (usuario === 'admin' && senha === 'admin123') {
      const userData = {
        id: 1,
        username: 'admin',
        role: 'admin',
        lastLogin: new Date()
      };

      // Gerar token seguro (em desenvolvimento usar token simples)
      const token = process.env.NODE_ENV === 'production' 
        ? generateSecureToken(userData)
        : 'admin-token';

      res.json({
        sucesso: true,
        mensagem: 'Login realizado com sucesso',
        token,
        user: {
          id: userData.id,
          username: userData.username,
          role: userData.role,
          lastLogin: userData.lastLogin
        }
      });
    } else {
      // Log de tentativa de login inválida
      console.warn(`Tentativa de login inválida para usuário: ${usuario} - IP: ${req.ip}`);
      
      res.status(401).json({
        sucesso: false,
        mensagem: 'Credenciais inválidas',
        codigo: 'INVALID_CREDENTIALS'
      });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor',
      codigo: 'LOGIN_ERROR'
    });
  }
});

// Rota de logout - Invalida token do usuário
router.post('/logout', (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      
      // Invalidar token se não for o token de desenvolvimento
      if (token !== 'admin-token') {
        invalidateToken(token);
      }
    }

    res.json({
      sucesso: true,
      mensagem: 'Logout realizado com sucesso',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro no logout:', error);
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor',
      codigo: 'LOGOUT_ERROR'
    });
  }
});

// Rota para verificar validade do token
router.get('/verify', (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Token não fornecido',
        codigo: 'MISSING_TOKEN'
      });
    }
    
    const token = authHeader.replace('Bearer ', '');
    
    // Verificação simples para token de desenvolvimento
    if (token === 'admin-token') {
      return res.json({
        sucesso: true,
        user: {
          id: 1,
          username: 'admin',
          role: 'admin',
          lastLogin: new Date()
        },
        tokenValid: true
      });
    }
    
    // Em produção, verificar token dinâmico
    // const user = validateToken(token);
    // if (user) { ... }
    
    res.status(401).json({
      sucesso: false,
      mensagem: 'Token inválido',
      codigo: 'INVALID_TOKEN'
    });
  } catch (error) {
    console.error('Erro na verificação de token:', error);
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor',
      codigo: 'VERIFY_ERROR'
    });
  }
});

// Rota para renovar token (opcional)
router.post('/refresh', (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Token não fornecido',
        codigo: 'MISSING_TOKEN'
      });
    }
    
    const token = authHeader.replace('Bearer ', '');
    
    // Lógica para renovar token (implementar conforme necessidade)
    if (token === 'admin-token') {
      return res.json({
        sucesso: true,
        token: 'admin-token', // Em produção, gerar novo token
        mensagem: 'Token renovado com sucesso'
      });
    }
    
    res.status(401).json({
      sucesso: false,
      mensagem: 'Token inválido para renovação',
      codigo: 'INVALID_REFRESH_TOKEN'
    });
  } catch (error) {
    console.error('Erro na renovação de token:', error);
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor',
      codigo: 'REFRESH_ERROR'
    });
  }
});

export default router;
