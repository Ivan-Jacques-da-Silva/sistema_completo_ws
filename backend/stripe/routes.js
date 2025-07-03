
const express = require('express');
const { stripe, STRIPE_CONFIG } = require('./config');
const { processWebhookEvent } = require('./webhook');

const router = express.Router();

// Webhook endpoint - deve usar express.raw() para preservar o body
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verificar assinatura do webhook
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_CONFIG.webhookSecret);
  } catch (err) {
    console.error('❌ Erro na verificação da assinatura do webhook:', err.message);
    return res.status(400).send(`Webhook signature verification failed: ${err.message}`);
  }

  try {
    // Processar o evento
    await processWebhookEvent(event);
    
    console.log(`✅ Webhook processado com sucesso: ${event.type}`);
    res.json({ received: true });
    
  } catch (error) {
    console.error('❌ Erro ao processar webhook:', error);
    res.status(500).json({ 
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
    
    const { salaId, preco, nomeSala, priceId } = req.body;

    // Validar dados obrigatórios
    if (!salaId) {
      return res.status(400).json({ 
        error: 'salaId é obrigatório',
        received: req.body 
      });
    }

    // Verificar configurações da Stripe
    if (!STRIPE_CONFIG.productId) {
      console.error('❌ STRIPE_PRODUCT_ID não configurado');
      return res.status(500).json({ 
        error: 'Configuração do Stripe incompleta',
        details: 'STRIPE_PRODUCT_ID não encontrado no .env'
      });
    }

    if (!STRIPE_CONFIG.secretKey || STRIPE_CONFIG.secretKey.length < 50) {
      console.error('❌ STRIPE_SECRET_KEY inválida ou incompleta');
      return res.status(500).json({ 
        error: 'Chave secreta da Stripe inválida',
        details: 'Verifique a STRIPE_SECRET_KEY no .env'
      });
    }

    const baseUrl = req.headers.origin || 'http://localhost:3000';
    
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

    // Se tiver um priceId configurado, usar ele
    if (priceId) {
      sessionData.line_items = [{
        price: priceId,
        quantity: 1,
      }];
    } else {
      // Caso contrário, criar preço dinamicamente
      const precoFinal = preco || 100000; // Valor padrão se não informado
      sessionData.line_items = [{
        price_data: {
          currency: 'brl',
          product: STRIPE_CONFIG.productId,
          unit_amount: Math.round(precoFinal * 100), // Stripe usa centavos
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
