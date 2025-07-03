
# 📋 Guia Completo de Configuração do Stripe - Wall Street Corporate

Este guia explica passo a passo como funciona a integração do Stripe no sistema Wall Street Corporate, desde o clique do usuário até o processamento do pagamento.

## 🏗️ Arquitetura Geral

```
USUÁRIO → FRONTEND → BACKEND → STRIPE → WEBHOOK → BANCO DE DADOS
```

## 📁 Estrutura de Arquivos

### Backend (Stripe)
```
backend/
├── stripe/
│   ├── config.js      # Configurações do Stripe
│   ├── routes.js      # Rotas da API Stripe
│   ├── webhook.js     # Processamento de webhooks
│   └── utils.js       # Funções auxiliares
├── .env              # Variáveis de ambiente
└── server.js         # Servidor principal
```

### Frontend (Stripe)
```
src/
├── api/
│   └── Stripe.jsx    # Classe para chamar API Stripe
├── pages/
│   ├── CheckoutSucesso.jsx   # Página de sucesso
│   └── CheckoutCancelado.jsx # Página de cancelamento
└── components/
    └── FormulariosData.jsx   # Botões de pré-reserva
```

## 🔧 Configuração Passo a Passo

### 1. Configuração do Stripe Dashboard

1. **Criar conta no Stripe**
   - Acesse: https://dashboard.stripe.com
   - Crie uma conta ou faça login

2. **Obter chaves da API**
   - Vá em: `Developers` → `API Keys`
   - Copie a `Publishable Key` (começa com `pk_`)
   - Copie a `Secret Key` (começa com `sk_`)

3. **Criar produto**
   - Vá em: `Products` → `Add Product`
   - Nome: "Pré-reserva de Sala"
   - Copie o `Product ID` (começa com `prod_`)

4. **Configurar webhook**
   - Vá em: `Developers` → `Webhooks`
   - Clique em `Add endpoint`
   - URL: `https://api.wallstreetnr.com.br/stripe/webhook`
   - Eventos: `checkout.session.completed`, `payment_intent.succeeded`
   - Copie o `Signing secret` (começa com `whsec_`)

### 2. Configuração do Backend

#### Arquivo: `backend/.env`
```env
# Configurações do Stripe
STRIPE_PUBLIC_KEY="pk_live_51RT1OaRp..."
STRIPE_SECRET_KEY="sk_live_51RT1OaRp..."
STRIPE_PRODUCT_ID="prod_SW7U04ozTKkc7V"
STRIPE_WEBHOOK_SECRET="whsec_0FpNiRzLiD..."
```

#### Arquivo: `backend/stripe/config.js`
```javascript
// Carrega as configurações do .env
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const STRIPE_CONFIG = {
  publicKey: process.env.STRIPE_PUBLIC_KEY,
  secretKey: process.env.STRIPE_SECRET_KEY,
  productId: process.env.STRIPE_PRODUCT_ID,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET
};
```

### 3. Fluxo de Funcionamento

#### Passo 1: Usuário clica em "PRÉ-RESERVA"

**Arquivo:** `src/api/FormulariosData.jsx`
```javascript
// Componente PreReservaForm
<Button onClick={() => onPagamento(salaAtual)}>
  PRÉ-RESERVA
</Button>
```

**O que acontece:**
- Usuário vê uma sala disponível
- Clica no botão "PRÉ-RESERVA"
- Função `onPagamento()` é chamada com dados da sala

#### Passo 2: Frontend chama API do Stripe

**Arquivo:** `src/api/Stripe.jsx`
```javascript
static async createCustomCheckoutSession(salaData) {
  const response = await fetch(`${CONFIG.API_URL}/stripe/create-checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      salaId: salaData.id,
      preco: salaData.preco,
      nomeSala: salaData.nome
    })
  });
}
```

**O que acontece:**
- Frontend envia dados da sala para backend
- Dados incluem: ID da sala, preço, nome da sala

#### Passo 3: Backend cria sessão no Stripe

**Arquivo:** `backend/stripe/routes.js`
```javascript
router.post('/create-checkout-session', async (req, res) => {
  const { salaId, preco, nomeSala } = req.body;
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${baseUrl}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cancelado`,
    line_items: [{
      price_data: {
        currency: 'brl',
        product: STRIPE_CONFIG.productId,
        unit_amount: Math.round(preco * 100), // Stripe usa centavos
      },
      quantity: 1,
    }],
    metadata: {
      sala_id: salaId.toString(),
      nome_sala: nomeSala
    }
  });
});
```

**O que acontece:**
- Backend recebe dados da sala
- Cria sessão de checkout no Stripe
- Retorna URL de pagamento
- Usuário é redirecionado para Stripe

#### Passo 4: Usuário paga no Stripe

**O que acontece:**
- Usuário preenche dados do cartão
- Stripe processa pagamento
- Se aprovado: redirect para `/sucesso?session_id=cs_xxx`
- Se cancelado: redirect para `/cancelado`

#### Passo 5: Stripe envia webhook

**Arquivo:** `backend/stripe/webhook.js`
```javascript
async function processWebhookEvent(event) {
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const salaId = session.metadata.sala_id;
    
    // Marcar sala como reservada
    await prisma.sala.update({
      where: { id: parseInt(salaId) },
      data: { disponivel: false }
    });
    
    // Salvar dados do pagamento
    await prisma.pagamento.create({
      data: {
        sessionId: session.id,
        salaId: parseInt(salaId),
        valor: session.amount_total / 100,
        status: 'completed'
      }
    });
  }
}
```

**O que acontece:**
- Stripe envia webhook para `/stripe/webhook`
- Sistema marca sala como indisponível
- Salva dados do pagamento no banco

#### Passo 6: Página de sucesso

**Arquivo:** `src/pages/CheckoutSucesso.jsx`
```javascript
// Verifica status do pagamento
const verificarPagamento = async () => {
  const sessionId = new URLSearchParams(window.location.search).get('session_id');
  const response = await StripeAPI.getSessionStatus(sessionId);
  
  if (response.payment_status === 'paid') {
    setStatus('sucesso');
  }
};
```

**O que acontece:**
- Usuário chega na página `/sucesso`
- Sistema verifica status real do pagamento
- Mostra mensagem de confirmação

## 🔍 Debugging e Logs

### Logs do Backend
```bash
# Verificar logs do servidor
tail -f logs/operations-*.log

# Verificar status do Stripe
curl http://localhost:5000/stripe/config
```

### Logs do Stripe Dashboard
- Vá em: `Developers` → `Logs`
- Veja todas as requisições em tempo real

## 🚨 Resolução de Problemas

### Erro 404 - Rota não encontrada
**Problema:** Rota `/stripe/create-checkout-session` não encontrada
**Solução:** Verificar se `app.use('/stripe', stripeRoutes)` está no `server.js`

### Erro 500 - Chave inválida
**Problema:** `STRIPE_SECRET_KEY` incompleta
**Solução:** Verificar se a chave tem mais de 50 caracteres

### Erro webhook - Assinatura inválida
**Problema:** Webhook não consegue verificar assinatura
**Solução:** Verificar `STRIPE_WEBHOOK_SECRET` no .env

### Pagamento não atualiza banco
**Problema:** Webhook não está funcionando
**Solução:** 
1. Verificar URL do webhook no Stripe
2. Verificar se servidor está acessível
3. Verificar logs do webhook

## 📊 Monitoramento

### Métricas importantes:
- Taxa de conversão de checkout
- Pagamentos abandonados
- Tempo de processamento
- Erros de webhook

### Ferramentas:
- Stripe Dashboard → Analytics
- Logs do servidor
- Banco de dados (tabela pagamentos)

## 🔒 Segurança

### Boas práticas:
1. **Nunca** expor `STRIPE_SECRET_KEY` no frontend
2. Sempre validar webhooks com assinatura
3. Usar HTTPS em produção
4. Verificar status real do pagamento

### Validações:
```javascript
// Sempre validar dados recebidos
if (!salaId || !preco) {
  return res.status(400).json({ error: 'Dados inválidos' });
}

// Verificar assinatura do webhook
const signature = req.headers['stripe-signature'];
const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
```

## 📝 Resumo do Fluxo

1. **Usuário**: Clica em "PRÉ-RESERVA"
2. **Frontend**: Chama API `/stripe/create-checkout-session`
3. **Backend**: Cria sessão no Stripe
4. **Stripe**: Processa pagamento
5. **Webhook**: Atualiza banco de dados
6. **Usuário**: Vê confirmação na página de sucesso

Este sistema garante que o pagamento seja processado de forma segura e que a sala seja automaticamente marcada como indisponível após o pagamento confirmado.
