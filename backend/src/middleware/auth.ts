
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

interface AuthenticatedRequest extends Request {
  user?: any;
}

// Interface para dados do usuário
interface UserData {
  id: number;
  username: string;
  role: string;
  lastLogin?: Date;
}

// Cache simples para tokens válidos (em produção usar Redis)
const validTokens = new Map<string, { user: UserData; expires: number }>();

// Função para gerar token seguro
const generateSecureToken = (user: UserData): string => {
  const timestamp = Date.now();
  const randomBytes = crypto.randomBytes(16).toString('hex');
  const payload = JSON.stringify({ user, timestamp });
  
  // Em produção, usar JWT ou similar
  const token = crypto.createHash('sha256')
    .update(payload + process.env.JWT_SECRET || 'default-secret')
    .digest('hex');
  
  // Armazenar token com expiração de 24h
  validTokens.set(token, {
    user,
    expires: timestamp + (24 * 60 * 60 * 1000)
  });
  
  return token;
};

// Função para validar token
const validateToken = (token: string): UserData | null => {
  const tokenData = validTokens.get(token);
  
  if (!tokenData) {
    return null;
  }
  
  // Verificar se token expirou
  if (Date.now() > tokenData.expires) {
    validTokens.delete(token);
    return null;
  }
  
  return tokenData.user;
};

// Middleware de autenticação principal para rotas administrativas
export const authenticateAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ 
        sucesso: false, 
        mensagem: 'Token de acesso não fornecido',
        codigo: 'MISSING_TOKEN'
      });
      return;
    }
    
    const token = authHeader.replace('Bearer ', '');
    
    // Validação básica para demonstração (admin-token)
    if (token === 'admin-token') {
      req.user = { 
        id: 1, 
        username: 'admin', 
        role: 'admin',
        lastLogin: new Date()
      };
      return next();
    }
    
    // Validação de token gerado dinamicamente
    const user = validateToken(token);
    if (user) {
      req.user = user;
      return next();
    }
    
    res.status(401).json({ 
      sucesso: false, 
      mensagem: 'Token de acesso inválido ou expirado',
      codigo: 'INVALID_TOKEN'
    });
    
  } catch (error) {
    console.error('Erro na autenticação:', error);
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno na verificação de autenticação',
      codigo: 'AUTH_ERROR'
    });
  }
};

// Middleware opcional para rate limiting específico de admin
export const adminRateLimit = (req: Request, res: Response, next: NextFunction): void => {
  // Implementar rate limiting mais restritivo para rotas admin
  // Por exemplo: máximo 30 requests por minuto para admins
  next();
};

// Função para fazer logout (invalidar token)
export const invalidateToken = (token: string): boolean => {
  return validTokens.delete(token);
};

// Função para limpar tokens expirados (executar periodicamente)
export const cleanExpiredTokens = (): void => {
  const now = Date.now();
  for (const [token, data] of validTokens.entries()) {
    if (now > data.expires) {
      validTokens.delete(token);
    }
  }
};

// Limpar tokens expirados a cada hora
setInterval(cleanExpiredTokens, 60 * 60 * 1000);

export { generateSecureToken, validateToken };
