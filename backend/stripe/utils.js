
const { stripe } = require('./config');

// Função para verificar status de uma sessão
const getSessionStatus = async (sessionId) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return {
      status: session.status,
      payment_status: session.payment_status,
      metadata: session.metadata
    };
  } catch (error) {
    console.error('Erro ao buscar status da sessão:', error);
    throw error;
  }
};

// Função para criar um link de checkout com metadata
const createCheckoutUrl = (salaId, nomeSala) => {
  const baseUrl = process.env.STRIPE_CHECKOUT_URL || 'https://book.stripe.com/4gMdRb1N6cEX5xtdg104800';
  
  // Se você quiser adicionar parâmetros à URL (caso a Stripe permita)
  const url = new URL(baseUrl);
  url.searchParams.append('client_reference_id', salaId);
  
  return url.toString();
};

// Função para validar webhook
const validateWebhookSignature = (body, signature, secret) => {
  try {
    return stripe.webhooks.constructEvent(body, signature, secret);
  } catch (error) {
    throw new Error(`Webhook signature verification failed: ${error.message}`);
  }
};

module.exports = {
  getSessionStatus,
  createCheckoutUrl,
  validateWebhookSignature
};
