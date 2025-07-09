
const stripe = require('stripe');

// Log detalhado das variáveis de ambiente na inicialização
console.log('🔧 ========== VERIFICAÇÃO DAS VARIÁVEIS DE AMBIENTE ==========');
console.log('📂 Diretório atual:', process.cwd());
console.log('🔑 STRIPE_PUBLIC_KEY:', process.env.STRIPE_PUBLIC_KEY ? `${process.env.STRIPE_PUBLIC_KEY.substring(0, 15)}...` : '❌ NÃO DEFINIDA');
console.log('🔑 STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? `${process.env.STRIPE_SECRET_KEY.substring(0, 15)}...` : '❌ NÃO DEFINIDA');
console.log('🆔 STRIPE_PRODUCT_ID:', process.env.STRIPE_PRODUCT_ID || '❌ NÃO DEFINIDO');
console.log('🆔 STRIPE_PRICE_ID:', process.env.STRIPE_PRICE_ID || '❌ NÃO DEFINIDO');
console.log('🔒 STRIPE_WEBHOOK_SECRET:', process.env.STRIPE_WEBHOOK_SECRET ? `${process.env.STRIPE_WEBHOOK_SECRET.substring(0, 15)}...` : '❌ NÃO DEFINIDO');
console.log('🌐 STRIPE_CHECKOUT_URL:', process.env.STRIPE_CHECKOUT_URL || '❌ NÃO DEFINIDA');
console.log('🔧 =========================================================');

// Verificar se as variáveis obrigatórias estão definidas
const requiredEnvVars = [
  'STRIPE_PUBLIC_KEY',
  'STRIPE_SECRET_KEY', 
  'STRIPE_PRODUCT_ID',
  'STRIPE_WEBHOOK_SECRET'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ ========== ERRO DE CONFIGURAÇÃO ==========');
  console.error('❌ Variáveis de ambiente obrigatórias não encontradas:');
  missingVars.forEach(varName => {
    console.error(`❌ ${varName}: NÃO DEFINIDA`);
  });
  console.error('❌ Verifique se o arquivo .env existe e contém todas as variáveis');
  console.error('❌ ==========================================');
  throw new Error(`Variáveis de ambiente obrigatórias não encontradas: ${missingVars.join(', ')}`);
}

// Validar formato das chaves
if (!process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
  throw new Error('STRIPE_SECRET_KEY deve começar com "sk_"');
}

if (!process.env.STRIPE_PUBLIC_KEY.startsWith('pk_')) {
  throw new Error('STRIPE_PUBLIC_KEY deve começar com "pk_"');
}

if (!process.env.STRIPE_WEBHOOK_SECRET.startsWith('whsec_')) {
  throw new Error('STRIPE_WEBHOOK_SECRET deve começar com "whsec_"');
}

// Inicializar Stripe com chave secreta
let stripeInstance;
try {
  stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
  console.log('✅ Stripe inicializado com sucesso');
} catch (error) {
  console.error('❌ Erro ao inicializar Stripe:', error.message);
  throw error;
}

// Detectar ambiente baseado na chave secreta
const isTestMode = process.env.STRIPE_SECRET_KEY.includes('test');
const isProductionMode = process.env.STRIPE_SECRET_KEY.includes('live');

// Log do ambiente detectado
if (isProductionMode) {
  console.log('🔴 ========== MODO PRODUÇÃO DETECTADO ==========');
  console.log('🔴 ATENÇÃO: Usando chaves de PRODUÇÃO');
  console.log('🔴 Pagamentos reais serão processados');
  console.log('🔴 Verifique se está em ambiente correto');
  console.log('🔴 =============================================');
} else if (isTestMode) {
  console.log('🧪 ========== MODO TESTE DETECTADO ==========');
  console.log('🧪 Usando chaves de TESTE');
  console.log('🧪 Pagamentos são simulados');
  console.log('🧪 Nenhuma cobrança real será feita');
  console.log('🧪 ==========================================');
}

// Configurações do Stripe
const STRIPE_CONFIG = {
  publicKey: process.env.STRIPE_PUBLIC_KEY,
  secretKey: process.env.STRIPE_SECRET_KEY,
  productId: process.env.STRIPE_PRODUCT_ID,
  priceId: process.env.STRIPE_PRICE_ID, // Adicionar suporte ao PRICE_ID
  checkoutUrl: process.env.STRIPE_CHECKOUT_URL,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  destinationName: isTestMode ? 'pre-reservas-teste' : 'pre-reservas-producao',
  isTestMode: isTestMode,
  isProductionMode: isProductionMode
};

// Log das configurações finais (sem expor as chaves completas)
console.log('✅ ========== CONFIGURAÇÕES CARREGADAS ==========');
console.log('✅ Ambiente:', STRIPE_CONFIG.destinationName);
console.log('✅ Modo de Teste:', STRIPE_CONFIG.isTestMode ? '🧪 ATIVO' : '❌ DESATIVADO');
console.log('✅ Modo de Produção:', STRIPE_CONFIG.isProductionMode ? '🔴 ATIVO' : '✅ DESATIVADO');
console.log('✅ Public Key:', STRIPE_CONFIG.publicKey ? 'Configurada' : 'Erro');
console.log('✅ Secret Key:', STRIPE_CONFIG.secretKey ? 'Configurada' : 'Erro');
console.log('✅ Product ID:', STRIPE_CONFIG.productId);
console.log('✅ Price ID:', STRIPE_CONFIG.priceId || 'Não configurado (usando price_data)');
console.log('✅ Webhook Secret:', STRIPE_CONFIG.webhookSecret ? 'Configurado' : 'Erro');
console.log('✅ Checkout URL:', STRIPE_CONFIG.checkoutUrl);

// Aviso visual para modo atual
if (STRIPE_CONFIG.isTestMode) {
  console.log('');
  console.log('🧪 ========== MODO DE TESTE ATIVO ==========');
  console.log('🧪 Todos os pagamentos são simulados');
  console.log('🧪 Nenhuma cobrança real será feita');
  console.log('🧪 Use dados de teste do Stripe');
  console.log('🧪 Para produção: comente as linhas de TESTE e descomente PRODUÇÃO no .env');
  console.log('🧪 =========================================');
  console.log('');
} else if (STRIPE_CONFIG.isProductionMode) {
  console.log('');
  console.log('🔴 ========== MODO PRODUÇÃO ATIVO ==========');
  console.log('🔴 ATENÇÃO: Pagamentos reais serão processados!');
  console.log('🔴 Clientes serão cobrados de verdade');
  console.log('🔴 Verifique se todas as configurações estão corretas');
  console.log('🔴 Para teste: comente as linhas de PRODUÇÃO e descomente TESTE no .env');
  console.log('🔴 ========================================');
  console.log('');
}

console.log('✅ ===============================================');

module.exports = {
  stripe: stripeInstance,
  STRIPE_CONFIG
};
