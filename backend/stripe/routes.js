const express = require('express');
const { stripe, STRIPE_CONFIG } = require('./config');
const { processWebhookEvent } = require('./webhook');

const router = express.Router();

// Webhook endpoint - deve usar express.raw() para preservar o body
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  // Log detalhado para debugging
  console.log('🔍 Webhook recebido:', {
    signature: sig ? 'Presente' : 'Ausente',
    bodySize: req.body ? req.body.length : 0,
    webhookSecret: STRIPE_CONFIG.webhookSecret ? 'Configurado' : 'NÃO CONFIGURADO'
  });

  // Verificar se o webhook secret está configurado
  if (!STRIPE_CONFIG.webhookSecret) {
    console.error('❌ STRIPE_WEBHOOK_SECRET não configurado');
    return res.status(500).json({ error: 'Webhook secret não configurado' });
  }

  try {
    // Verificar assinatura do webhook
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_CONFIG.webhookSecret);
    console.log(`✅ Assinatura verificada - Evento: ${event.type}`);
  } catch (err) {
    console.error('❌ Erro na verificação da assinatura do webhook:', {
      message: err.message,
      signature: sig,
      bodyPreview: req.body ? req.body.toString().substring(0, 100) + '...' : 'Body vazio'
    });
    return res.status(400).send(`Webhook signature verification failed: ${err.message}`);
  }

  try {
    // Processar o evento
    await processWebhookEvent(event);

    console.log(`✅ Webhook processado com sucesso: ${event.type}`);
    res.status(200).json({ received: true, eventType: event.type });

  } catch (error) {
    console.error('❌ Erro ao processar webhook:', {
      eventType: event.type,
      error: error.message,
      stack: error.stack
    });

    // Retornar 200 para evitar reenvios desnecessários do Stripe
    res.status(200).json({
      received: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

// Endpoint para obter configurações do Stripe (chave pública)
router.get('/config', (req, res) => {
  res.json({
    publicKey: STRIPE_CONFIG.publicKey,
    checkoutUrl: STRIPE_CONFIG.checkoutUrl
  });
});

// Endpoint para criar sessão de checkout com dados da sala
router.post('/create-checkout-session', async (req, res) => {
  try {
    console.log('📥 Dados recebidos:', req.body);

    // IMPORTANTE: O valor 'preco' é ignorado - sempre usamos R$25000,00 fixo
    const { salaId, preco, nomeSala, priceId } = req.body;

    // Validar dados obrigatórios
    if (!salaId) {
      return res.status(400).json({
        error: 'salaId é obrigatório',
        received: req.body
      });
    }

    // Log detalhado das configurações (sem expor chaves)
    console.log('🔧 Verificando configurações da Stripe...');
    console.log('- Public Key:', STRIPE_CONFIG.publicKey ? 'Configurada' : 'NÃO CONFIGURADA');
    console.log('- Secret Key:', STRIPE_CONFIG.secretKey ? `Configurada (${STRIPE_CONFIG.secretKey.length} chars)` : 'NÃO CONFIGURADA');
    console.log('- Product ID:', STRIPE_CONFIG.productId || 'NÃO CONFIGURADO');
    console.log('- Webhook Secret:', STRIPE_CONFIG.webhookSecret ? 'Configurado' : 'NÃO CONFIGURADO');

    // Verificar se as configurações básicas estão presentes
    if (!STRIPE_CONFIG.secretKey) {
      console.error('❌ STRIPE_SECRET_KEY não encontrada no .env');
      return res.status(500).json({
        error: 'Configuração do Stripe incompleta',
        details: 'STRIPE_SECRET_KEY não encontrada no arquivo .env'
      });
    }

    if (!STRIPE_CONFIG.productId) {
      console.error('❌ STRIPE_PRODUCT_ID não configurado');
      return res.status(500).json({
        error: 'Configuração do Stripe incompleta',
        details: 'STRIPE_PRODUCT_ID não encontrado no .env'
      });
    }

    if (STRIPE_CONFIG.secretKey.length < 50) {
      console.error('❌ STRIPE_SECRET_KEY muito curta ou inválida');
      return res.status(500).json({
        error: 'Chave secreta da Stripe inválida',
        details: 'STRIPE_SECRET_KEY deve ter pelo menos 50 caracteres'
      });
    }

    // Usar a URL correta do frontend em produção
    const baseUrl = req.headers.origin || 'https://front.wallstreetnr.com.br';

    let sessionData = {
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${baseUrl}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancelado`,
      metadata: {
        sala_id: salaId.toString(),
        nome_sala: nomeSala || `Sala ${salaId}`,
        timestamp: new Date().toISOString()
      },
      customer_creation: 'always',
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['BR'],
      },
      phone_number_collection: {
        enabled: true,
      },
      custom_fields: [
        {
          key: 'cpf_cnpj',
          label: {
            type: 'custom',
            custom: 'CPF/CNPJ'
          },
          type: 'text',
          optional: false
        }
      ]
    };

    // VALOR FIXO DE ENTRADA: R$25000,00
    // Não usa o valor do imóvel, sempre cobra R$25000,00 como entrada
    const VALOR_ENTRADA_FIXO = 25000.00; // valor em reais

    // Se tiver um priceId configurado, usar ele
    if (priceId) {
      sessionData.line_items = [{
        price: priceId,
        quantity: 1,
      }];
    } else {
      // Valor fixo de R$ 250,00 para pré-reserva (entrada)
      sessionData.line_items = [{
        price_data: {
          currency: 'brl',
          product: STRIPE_CONFIG.productId,
          unit_amount: Math.round(VALOR_ENTRADA_FIXO * 100), // R$25000,00 em centavos = 2500
        },
        quantity: 1,
      }];
    }

    console.log('🔄 Criando sessão com dados:', JSON.stringify(sessionData, null, 2));

    const session = await stripe.checkout.sessions.create(sessionData);

    console.log(`✅ Sessão de checkout criada para sala ${salaId}:`, {
      sessionId: session.id,
      url: session.url,
      metadata: session.metadata
    });

    res.json({
      url: session.url,
      sessionId: session.id
    });

  } catch (error) {
    console.error('❌ Erro detalhado ao criar sessão de checkout:', {
      message: error.message,
      type: error.type,
      code: error.code,
      param: error.param,
      stack: error.stack
    });

    res.status(500).json({
      error: error.message,
      type: error.type || 'unknown',
      details: 'Erro interno do servidor - verifique os logs'
    });
  }
});

// Endpoint para testar configuração do webhook
router.get('/webhook/test', (req, res) => {
  res.json({
    webhookSecret: STRIPE_CONFIG.webhookSecret ? 'Configurado' : 'NÃO CONFIGURADO',
    webhookUrl: `${req.protocol}://${req.get('host')}/stripe/webhook`,
    status: 'Webhook endpoint funcionando'
  });
});

// Endpoint de informações sobre webhook (apenas GET)
router.get('/webhook/teste', (req, res) => {
  res.json({
    status: 'Endpoint de webhook de teste removido',
    message: 'Use apenas /stripe/webhook para webhooks',
    webhookUrl: `${req.protocol}://${req.get('host')}/stripe/webhook`,
    webhookSecret: STRIPE_CONFIG.webhookSecret ? 'Configurado' : 'NÃO CONFIGURADO'
  });
});

// Endpoint para debug - verificar última atualização de sala
router.get('/debug/sala/:salaId', async (req, res) => {
  try {
    const { salaId } = req.params;
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sala = await prisma.sala.findUnique({
      where: { id: parseInt(salaId) }
    });

    const ultimasAlteracoes = await prisma.historicoAlteracoes.findMany({
      where: { 
        tabela: 'salas',
        registro_id: parseInt(salaId)
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    res.json({
      sala,
      ultimasAlteracoes,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erro no debug:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para verificar status de uma sessão de checkout
router.get('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    res.json({
      id: session.id,
      status: session.status,
      payment_status: session.payment_status,
      metadata: session.metadata,
      customer_details: session.customer_details
    });

  } catch (error) {
    console.error('❌ Erro ao buscar sessão:', error);
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;