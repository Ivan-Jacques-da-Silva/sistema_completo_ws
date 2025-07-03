
const { stripe, STRIPE_CONFIG } = require('./config');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const handleCheckoutCompleted = async (session) => {
  try {
    console.log('🎉 Pagamento concluído:', session.id);
    console.log('📋 Dados da sessão:', JSON.stringify(session, null, 2));
    
    const salaId = session.metadata?.sala_id;
    if (!salaId) {
      console.error('❌ sala_id não encontrado no metadata da sessão');
      return;
    }

    // Buscar dados do cliente se existir
    let customer = null;
    if (session.customer) {
      try {
        customer = await stripe.customers.retrieve(session.customer);
      } catch (error) {
        console.error('⚠️ Erro ao buscar dados do cliente:', error);
      }
    }

    // Extrair CPF/CNPJ dos custom fields
    let cpfCnpj = 'Não informado';
    if (session.custom_fields && session.custom_fields.length > 0) {
      const cpfField = session.custom_fields.find(field => field.key === 'cpf_cnpj');
      if (cpfField && cpfField.text && cpfField.text.value) {
        cpfCnpj = cpfField.text.value;
      }
    }

    // Extrair dados de contato
    const nomeCliente = session.customer_details?.name || customer?.name || 'Nome não informado';
    const emailCliente = session.customer_details?.email || customer?.email || 'Não informado';
    const telefoneCliente = session.customer_details?.phone || 'Não informado';
    
    console.log('👤 Dados do cliente extraídos:', {
      nome: nomeCliente,
      email: emailCliente,
      telefone: telefoneCliente,
      cpf_cnpj: cpfCnpj
    });
    
    // Atualizar sala para indisponível
    await prisma.sala.update({
      where: { id: parseInt(salaId) },
      data: { disponivel: false }
    });

    // Salvar dados da pré-reserva com informações completas
    await prisma.preReserva.create({
      data: {
        nome: nomeCliente,
        cpf_cnpj: cpfCnpj,
        contato: telefoneCliente,
        email: emailCliente,
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
