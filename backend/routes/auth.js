
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

    // Definir usuários e suas permissões
    const usuarios = {
      'wallstreet': {
        senha: 'wallstreet@2025',
        token: 'admin-token-123',
        permissoes: ['formularios', 'agendamentos', 'salas', 'admin', 'historico']
      },
      'corretor': {
        senha: 'corretor@2025',
        token: 'corretor-token-456',
        permissoes: ['formularios', 'agendamentos']
      }
    };

    const userData = usuarios[usuario];
    
    if (userData && userData.senha === senha) {
      await registrarHistorico(req, 'LOGIN', usuario, null, null, { usuario });
      
      res.json({ 
        sucesso: true, 
        mensagem: 'Login realizado com sucesso!',
        token: userData.token,
        usuario: usuario,
        permissoes: userData.permissoes
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
