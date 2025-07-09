
const { stripe, STRIPE_CONFIG } = require('./config');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const handleCheckoutCompleted = async (session) => {
  try {
    console.log('🎉 Pagamento concluído:', session.id);
    console.log('📋 Dados da sessão:', JSON.stringify(session, null, 2));
    console.log('🔍 Metadata extraído:', session.metadata);
    
    // Verificar se o banco está acessível
    try {
      await prisma.$connect();
      console.log('✅ Conexão com banco estabelecida');
    } catch (dbError) {
      console.error('❌ Erro ao conectar com banco:', dbError);
      throw new Error('Banco de dados indisponível');
    }
    
    const salaId = session.metadata?.sala_id;
    if (!salaId) {
      console.error('❌ sala_id não encontrado no metadata da sessão');
      return;
    }

    console.log(`🔍 Processando pagamento para sala ID: ${salaId}`);

    // Verificar se a sala existe antes de atualizar
    const salaExistente = await prisma.sala.findUnique({
      where: { id: parseInt(salaId) }
    });
    
    if (!salaExistente) {
      console.error(`❌ Sala com ID ${salaId} não encontrada`);
      throw new Error(`Sala ${salaId} não encontrada`);
    }

    console.log(`📍 Sala encontrada:`, {
      id: salaExistente.id,
      nome: salaExistente.nome,
      numero: salaExistente.numero,
      disponivel_antes: salaExistente.disponivel
    });

    // Buscar dados do cliente se existir
    let customer = null;
    if (session.customer) {
      try {
        customer = await stripe.customers.retrieve(session.customer);
        console.log('👤 Cliente Stripe recuperado:', customer.name || customer.email);
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
    
    // PRIMEIRA OPERAÇÃO: Atualizar sala para indisponível
    console.log(`🔄 Atualizando sala ${salaId} de disponível:${salaExistente.disponivel} para disponível:false`);
    
    const salaAtualizada = await prisma.sala.update({
      where: { id: parseInt(salaId) },
      data: { 
        disponivel: false 
      }
    });
    
    console.log(`✅ Sala ${salaId} atualizada com sucesso:`, {
      id: salaAtualizada.id,
      nome: salaAtualizada.nome,
      numero: salaAtualizada.numero,
      disponivel_depois: salaAtualizada.disponivel,
      preco: salaAtualizada.preco
    });

    // SEGUNDA OPERAÇÃO: Salvar dados da pré-reserva 
    console.log('💾 Salvando pré-reserva...');
    const preReserva = await prisma.preReserva.create({
      data: {
        nome: nomeCliente,
        cpf_cnpj: cpfCnpj,
        contato: telefoneCliente,
        email: emailCliente,
        visualizado: false
      }
    });
    
    console.log(`✅ Pré-reserva criada com ID: ${preReserva.id}`, {
      id: preReserva.id,
      nome: preReserva.nome,
      email: preReserva.email
    });

    // TERCEIRA OPERAÇÃO: Registrar no histórico
    await prisma.historicoAlteracoes.create({
      data: {
        tabela: 'salas',
        operacao: 'UPDATE',
        registro_id: parseInt(salaId),
        dados_antes: { 
          disponivel: salaExistente.disponivel,
          nome: salaExistente.nome,
          numero: salaExistente.numero
        },
        dados_depois: { 
          disponivel: false,
          comprador: nomeCliente,
          email: emailCliente,
          session_id: session.id
        },
        usuario: 'stripe_webhook',
        ip_address: 'stripe.com',
        user_agent: 'Stripe Webhook - Pagamento Concluído'
      }
    });

    console.log(`🎯 SUCESSO COMPLETO - Sala ${salaId} (${salaExistente.nome}) vendida para ${nomeCliente}`);
    console.log(`📊 Resumo da operação:`, {
      sala_id: salaId,
      sala_nome: salaExistente.nome,
      disponivel_antes: salaExistente.disponivel,
      disponivel_depois: false,
      comprador: nomeCliente,
      email: emailCliente,
      pre_reserva_id: preReserva.id,
      session_id: session.id
    });
    
  } catch (error) {
    console.error('❌ ERRO CRÍTICO ao processar checkout concluído:', error);
    console.error('📋 Stack trace:', error.stack);
    
    // Tentar reverter alterações se possível
    try {
      const salaId = session.metadata?.sala_id;
      if (salaId) {
        await prisma.sala.update({
          where: { id: parseInt(salaId) },
          data: { disponivel: true }
        });
        console.log(`🔄 Sala ${salaId} revertida para disponível devido ao erro`);
      }
    } catch (revertError) {
      console.error('❌ Erro ao reverter sala:', revertError);
    }
    
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
