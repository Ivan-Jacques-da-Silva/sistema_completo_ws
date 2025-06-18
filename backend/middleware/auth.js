
// Middleware de autenticação admin
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token || token !== 'admin-token-123') {
    return res.status(401).json({ 
      sucesso: false, 
      mensagem: 'Acesso negado. Token inválido.',
      codigo: 'UNAUTHORIZED'
    });
  }
  
  next();
};

module.exports = { authenticateAdmin };
