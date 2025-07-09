const express = require('express');
const router = express.Router();

// Importar todas as rotas
const authRoutes = require('./auth');
const adminRoutes = require('./admin');
const formularioRoutes = require('./formularios');
const salasRoutes = require('./salas');
const stripeRoutes = require('../stripe/routes');

// Configurar todas as rotas
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/formularios', formularioRoutes);
router.use('/salas', salasRoutes);
router.use('/stripe', stripeRoutes);

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