const express = require('express');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

// Importar middleware e rotas
const { auditarOperacao } = require('./middleware/auditoria');
const apiRoutes = require('./routes/index');
const stripeRoutes = require('./stripe/routes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Sistema de Logs Melhorado
const logError = (error, req = null, additionalData = {}) => {
  const timestamp = new Date().toISOString();
  const route = req ? `${req.method} ${req.path}` : 'SYSTEM';
  const ip = req ? (req.ip || req.connection.remoteAddress) : 'UNKNOWN';
  const userAgent = req ? req.headers['user-agent'] : 'UNKNOWN';

  const logEntry = `
[${timestamp}] ${route}
IP: ${ip}
User-Agent: ${userAgent}
ERROR: ${error.message}
Stack: ${error.stack}
Additional Data: ${JSON.stringify(additionalData, null, 2)}
${'='.repeat(80)}
`;

  // Criar diretório de logs se não existir
  if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
  }

  // Salvar no arquivo de log
  const logFile = `logs/error-${new Date().toISOString().split('T')[0]}.log`;
  fs.appendFileSync(logFile, logEntry);

  console.error(`[${timestamp}] ${route} - ERROR:`, error.message);
};

// Log de operações (sucessos)
const logOperation = (operation, req, data = {}) => {
  const timestamp = new Date().toISOString();
  const route = req ? `${req.method} ${req.path}` : 'SYSTEM';
  const ip = req ? (req.ip || req.connection.remoteAddress) : 'UNKNOWN';

  const logEntry = `[${timestamp}] ${route} - ${operation} - IP: ${ip} - Data: ${JSON.stringify(data)}\n`;

  if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
  }

  const logFile = `logs/operations-${new Date().toISOString().split('T')[0]}.log`;
  fs.appendFileSync(logFile, logEntry);

  console.log(`[${timestamp}] ${route} - ${operation}`);
};

// Middleware global de tratamento de erros
const errorHandler = (err, req, res, next) => {
  // Log detalhado do erro
  logError(err, req, {
    body: req.body,
    params: req.params,
    query: req.query
  });

  // Resposta amigável para o frontend
  let mensagem = 'Erro interno do servidor';
  let codigo = 'INTERNAL_ERROR';

  // Tratar diferentes tipos de erro
  if (err.code === 'P2002') {
    mensagem = 'Dados duplicados encontrados';
    codigo = 'DUPLICATE_DATA';
  } else if (err.code === 'P2025') {
    mensagem = 'Registro não encontrado';
    codigo = 'NOT_FOUND';
  } else if (err.message.includes('Unknown argument')) {
    mensagem = 'Erro de validação dos dados';
    codigo = 'VALIDATION_ERROR';
  }

  res.status(500).json({
    sucesso: false,
    mensagem,
    codigo,
    timestamp: new Date().toISOString()
  });
}; 

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://front.wallstreetnr.com.br'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Servir arquivos estáticos das imagens
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware de auditoria
app.use(auditarOperacao);

// Configurar rotas Stripe diretamente
app.use('/stripe', stripeRoutes);

// Configurar todas as rotas através do router principal
app.use('/api', apiRoutes);

// Middleware de tratamento de erros (deve estar por último)
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em http://0.0.0.0:${PORT}`);
  console.log(`🌐 Frontend deve acessar: http://localhost:${PORT}`);
  console.log(`📊 Sistema de auditoria ativo`);
  console.log(`🔒 Rotas modulares configuradas`);

  // Log das configurações do Stripe (sem expor as chaves)
  console.log('🔧 Verificando configurações do Stripe:');
  console.log('- STRIPE_PUBLIC_KEY:', process.env.STRIPE_PUBLIC_KEY ? 'Configurada' : '❌ NÃO CONFIGURADA');
  console.log('- STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'Configurada' : '❌ NÃO CONFIGURADA');
  console.log('- STRIPE_PRODUCT_ID:', process.env.STRIPE_PRODUCT_ID || '❌ NÃO CONFIGURADO');
  console.log('- STRIPE_WEBHOOK_SECRET:', process.env.STRIPE_WEBHOOK_SECRET ? 'Configurado' : '❌ NÃO CONFIGURADO');
});