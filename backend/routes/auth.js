
const express = require('express');
const { registrarHistorico } = require('../middleware/auditoria');

const router = express.Router();

// Login admin
router.post('/admin/login', async (req, res) => {
  try {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
      return res.status(400).json({ 
        sucesso: false, 
        mensagem: 'Usuário e senha são obrigatórios' 
      });
    }

    if (usuario === 'admin' && senha === 'admin123') {
      await registrarHistorico(req, 'LOGIN', 'admin', null, null, { usuario });
      
      res.json({ 
        sucesso: true, 
        mensagem: 'Login realizado com sucesso!',
        token: 'admin-token-123'
      });
    } else {
      await registrarHistorico(req, 'LOGIN_FAILED', 'admin', null, null, { usuario });
      
      res.status(401).json({ 
        sucesso: false, 
        mensagem: 'Credenciais inválidas' 
      });
    }
  } catch (error) {
    console.error('Erro no login admin:', error);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro interno do servidor' 
    });
  }
});

module.exports = router;
