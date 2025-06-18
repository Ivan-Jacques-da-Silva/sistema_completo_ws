
const express = require('express');
const router = express.Router();

// Importar todas as rotas
const salasRoutes = require('./salas');
const adminRoutes = require('./admin');
const formulariosRoutes = require('./formularios');
const authRoutes = require('./auth');

// Configurar as rotas
router.use('/salas', salasRoutes);
router.use('/admin', adminRoutes);
router.use('/formularios', formulariosRoutes);
router.use('/auth', authRoutes);

// Rota de status da API
router.get('/status', (req, res) => {
  res.json({ 
    status: 'online', 
    timestamp: new Date().toISOString(),
    version: '2.0.0'
  });
});

// CSRF Token (compatibilidade)
router.get('/csrf-token/', (req, res) => {
  res.json({ csrfToken: 'dummy-token' });
});

module.exports = router;
