
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
    const { salaId, preco, nomeSala, priceId } = req.body;

    // TODO: Configurar o valor do produto e price_id no seu painel Stripe
    // Para usar um produto fixo, descomente a linha abaixo e configure o STRIPE_PRICE_ID no .env
    // const priceId = process.env.STRIPE_PRICE_ID;

    let sessionData = {
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${req.headers.origin}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancelado`,
      metadata: {
        sala_id: salaId.toString(),
        nome_sala: nomeSala || `Sala ${salaId}`,
        // TODO: Adicionar outros metadados necessários
        // andar: andar,
        // area: area,
        timestamp: new Date().toISOString()
      },
      customer_creation: 'always',
      // TODO: Configurar dados do cliente se necessário
      // billing_address_collection: 'required',
    };

    // Se tiver um priceId configurado, usar ele
    if (priceId) {
      sessionData.line_items = [{
        price: priceId,
        quantity: 1,
      }];
    } else {
      // Caso contrário, criar preço dinamicamente
      sessionData.line_items = [{
        price_data: {
          currency: 'brl',
          product: STRIPE_CONFIG.productId,
          unit_amount: Math.round((preco || 100000) * 100), // Stripe usa centavos
        },
        quantity: 1,
      }];
    }

    const session = await stripe.checkout.sessions.create(sessionData);

    console.log(`🎯 Sessão de checkout criada para sala ${salaId}:`, session.id);

    res.json({ 
      url: session.url,
      sessionId: session.id
    });
  } catch (error) {
    console.error('❌ Erro ao criar sessão de checkout:', error);
    res.status(500).json({ 
      error: error.message,
      details: 'Verifique se o STRIPE_PRODUCT_ID está configurado no .env'
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
