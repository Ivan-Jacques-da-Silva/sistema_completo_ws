
const { stripe, STRIPE_CONFIG } = require('./config');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const handleCheckoutCompleted = async (session) => {
  try {
    console.log('🎉 Pagamento concluído:', session.id);
    
    const salaId = session.metadata?.sala_id;
    if (!salaId) {
      console.error('❌ sala_id não encontrado no metadata da sessão');
      return;
    }

    // Buscar dados do cliente
    const customer = await stripe.customers.retrieve(session.customer);
    
    // Atualizar sala para indisponível
    await prisma.sala.update({
      where: { id: parseInt(salaId) },
      data: { disponivel: false }
    });

    // Salvar dados da pré-reserva
    await prisma.preReserva.create({
      data: {
        nome: customer.name || session.customer_details?.name || 'Nome não informado',
        cpf_cnpj: session.customer_details?.phone || 'Não informado',
        contato: session.customer_details?.phone || session.customer_details?.email || 'Não informado',
        email: session.customer_details?.email || customer.email || 'Não informado',
        visualizado: false
      }
    });

    // Registrar no histórico
    await prisma.historicoAlteracoes.create({
      data: {
        tabela: 'salas',
        operacao: 'UPDATE',
        registro_id: parseInt(salaId),
        dados_antes: { disponivel: true },
        dados_depois: { disponivel: false },
        usuario: 'stripe_webhook',
        ip_address: 'stripe.com',
        user_agent: 'Stripe Webhook'
      }
    });

    console.log(`✅ Sala ${salaId} marcada como indisponível e dados salvos`);
    
  } catch (error) {
    console.error('❌ Erro ao processar checkout concluído:', error);
    throw error;
  }
};

const handleCheckoutExpired = async (session) => {
  try {
    console.log('⏰ Checkout expirado:', session.id);
    
    const salaId = session.metadata?.sala_id;
    if (!salaId) {
      console.error('❌ sala_id não encontrado no metadata da sessão');
      return;
    }

    // Garantir que a sala volte a ficar disponível
    await prisma.sala.update({
      where: { id: parseInt(salaId) },
      data: { disponivel: true }
    });

    console.log(`✅ Sala ${salaId} voltou a ficar disponível após expiração`);
    
  } catch (error) {
    console.error('❌ Erro ao processar checkout expirado:', error);
    throw error;
  }
};

const handleChargeRefunded = async (charge) => {
  try {
    console.log('💰 Cobrança estornada:', charge.id);
    
    // Buscar a sessão relacionada ao charge
    const sessions = await stripe.checkout.sessions.list({
      payment_intent: charge.payment_intent,
      limit: 1
    });

    if (sessions.data.length === 0) {
      console.error('❌ Sessão não encontrada para o charge estornado');
      return;
    }

    const session = sessions.data[0];
    const salaId = session.metadata?.sala_id;
    
    if (!salaId) {
      console.error('❌ sala_id não encontrado no metadata da sessão');
      return;
    }

    // Voltar sala para disponível
    await prisma.sala.update({
      where: { id: parseInt(salaId) },
      data: { disponivel: true }
    });

    // Registrar no histórico
    await prisma.historicoAlteracoes.create({
      data: {
        tabela: 'salas',
        operacao: 'UPDATE',
        registro_id: parseInt(salaId),
        dados_antes: { disponivel: false },
        dados_depois: { disponivel: true },
        usuario: 'stripe_webhook_refund',
        ip_address: 'stripe.com',
        user_agent: 'Stripe Webhook - Refund'
      }
    });

    console.log(`✅ Sala ${salaId} voltou a ficar disponível após estorno`);
    
  } catch (error) {
    console.error('❌ Erro ao processar estorno:', error);
    throw error;
  }
};

const processWebhookEvent = async (event) => {
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
        
      case 'checkout.session.expired':
        await handleCheckoutExpired(event.data.object);
        break;
        
      case 'charge.refunded':
        await handleChargeRefunded(event.data.object);
        break;
        
      default:
        console.log(`⚠️ Evento não tratado: ${event.type}`);
    }
  } catch (error) {
    console.error(`❌ Erro ao processar evento ${event.type}:`, error);
    throw error;
  }
};

module.exports = {
  processWebhookEvent,
  handleCheckoutCompleted,
  handleCheckoutExpired,
  handleChargeRefunded
};
