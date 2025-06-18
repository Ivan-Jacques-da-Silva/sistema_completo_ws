
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para registrar alterações no histórico
const registrarHistorico = async (req, operacao, tabela, registroId = null, dadosAntes = null, dadosDepois = null) => {
  try {
    await prisma.historicoAlteracoes.create({
      data: {
        tabela,
        operacao,
        registro_id: registroId,
        dados_antes: dadosAntes,
        dados_depois: dadosDepois,
        usuario: 'admin', // Por enquanto fixo, pode ser expandido com JWT
        ip_address: req.ip || req.connection.remoteAddress,
        user_agent: req.headers['user-agent']
      }
    });
  } catch (error) {
    console.error('Erro ao registrar histórico:', error);
  }
};

// Middleware para interceptar operações do Prisma
const auditarOperacao = (req, res, next) => {
  req.registrarHistorico = registrarHistorico;
  next();
};

module.exports = { auditarOperacao, registrarHistorico };
