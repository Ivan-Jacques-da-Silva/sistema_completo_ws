
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

// Endpoint para criar sessão personalizada (se necessário no futuro)
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { salaId, preco, nomeSala } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'brl',
          product: STRIPE_CONFIG.productId,
          unit_amount: Math.round(preco * 100), // Stripe usa centavos
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${req.headers.origin}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancelado`,
      metadata: {
        sala_id: salaId.toString(),
        nome_sala: nomeSala
      },
      customer_creation: 'always',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
