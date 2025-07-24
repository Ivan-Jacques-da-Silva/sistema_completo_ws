
// Middleware de autenticação admin
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  const tokensValidos = ['admin-token-123', 'correto-token-456'];
  
  if (!token || !tokensValidos.includes(token)) {
    return res.status(401).json({ 
      sucesso: false, 
      mensagem: 'Acesso negado. Token inválido.',
      codigo: 'UNAUTHORIZED'
    });
  }
  
  next();
};

module.exports = { authenticateAdmin };
