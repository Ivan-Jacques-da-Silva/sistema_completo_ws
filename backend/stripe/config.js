
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const STRIPE_CONFIG = {
  publicKey: process.env.STRIPE_PUBLIC_KEY,
  secretKey: process.env.STRIPE_SECRET_KEY,
  productId: process.env.STRIPE_PRODUCT_ID,
  checkoutUrl: process.env.STRIPE_CHECKOUT_URL,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  destinationName: 'pre-reservas'
};

module.exports = {
  stripe,
  STRIPE_CONFIG
};
