
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import StripeAPI from '../api/Stripe';

function CheckoutSucesso() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verificando');
  const [dadosSessao, setDadosSessao] = useState(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      verificarPagamento();
    } else {
      setStatus('erro');
    }
  }, [sessionId]);

  const verificarPagamento = async () => {
    try {
      console.log('🔍 Verificando pagamento para sessão:', sessionId);
      const resultado = await StripeAPI.getSessionStatus(sessionId);
      
      console.log('📊 Resultado da verificação:', resultado);
      setDadosSessao(resultado);
      
      if (resultado.payment_status === 'paid') {
        setStatus('sucesso');
      } else if (resultado.payment_status === 'unpaid') {
        setStatus('pendente');
      } else {
        setStatus('erro');
      }
    } catch (error) {
      console.error('❌ Erro ao verificar pagamento:', error);
      setStatus('erro');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        {status === 'verificando' && (
          <div>
            <div style={{
              width: '60px',
              height: '60px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #667eea',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 30px'
            }}></div>
            <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '28px', fontWeight: '600' }}>
              Verificando seu pagamento...
            </h2>
            <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6' }}>
              Aguarde alguns instantes enquanto confirmamos sua transação.
            </p>
          </div>
        )}

        {status === 'sucesso' && (
          <div>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #4CAF50, #45a049)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 30px',
              fontSize: '40px',
              color: 'white'
            }}>
              ✓
            </div>
            <h2 style={{ 
              color: '#4CAF50', 
              marginBottom: '20px', 
              fontSize: '32px', 
              fontWeight: '700' 
            }}>
              Pagamento Confirmado!
            </h2>
            <p style={{ 
              color: '#333', 
              fontSize: '18px', 
              marginBottom: '30px',
              lineHeight: '1.6'
            }}>
              Sua reserva foi processada com sucesso. Em breve entraremos em contato para finalizar o processo.
            </p>
            
            {dadosSessao?.metadata?.nome_sala && (
              <div style={{
                background: 'linear-gradient(135deg, #e8f5e8, #f0f8f0)',
                border: '2px solid #4CAF50',
                borderRadius: '15px',
                padding: '20px',
                marginBottom: '30px'
              }}>
                <strong style={{ color: '#2E7D32', fontSize: '16px' }}>
                  Sala reservada: {dadosSessao.metadata.nome_sala}
                </strong>
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link 
                to="/" 
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '12px 30px',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'transform 0.2s',
                  border: 'none'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Voltar ao Início
              </Link>
              <Link 
                to="/andares" 
                style={{
                  background: 'transparent',
                  color: '#667eea',
                  padding: '12px 30px',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  border: '2px solid #667eea',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#667eea';
                  e.target.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#667eea';
                }}
              >
                Ver Outras Salas
              </Link>
            </div>
          </div>
        )}

        {status === 'pendente' && (
          <div>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #FF9800, #F57C00)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 30px',
              fontSize: '40px',
              color: 'white'
            }}>
              ⏳
            </div>
            <h2 style={{ color: '#FF9800', marginBottom: '20px', fontSize: '28px', fontWeight: '600' }}>
              Pagamento Pendente
            </h2>
            <p style={{ color: '#333', fontSize: '16px', marginBottom: '30px', lineHeight: '1.6' }}>
              Seu pagamento ainda está sendo processado. Você receberá uma confirmação em breve.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={verificarPagamento}
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '12px 30px',
                  borderRadius: '25px',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Verificar Novamente
              </button>
              <Link 
                to="/" 
                style={{
                  background: 'transparent',
                  color: '#667eea',
                  padding: '12px 30px',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  border: '2px solid #667eea'
                }}
              >
                Voltar ao Início
              </Link>
            </div>
          </div>
        )}

        {status === 'erro' && (
          <div>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #f44336, #d32f2f)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 30px',
              fontSize: '40px',
              color: 'white'
            }}>
              ✕
            </div>
            <h2 style={{ color: '#f44336', marginBottom: '20px', fontSize: '28px', fontWeight: '600' }}>
              Erro na Verificação
            </h2>
            <p style={{ color: '#333', fontSize: '16px', marginBottom: '30px', lineHeight: '1.6' }}>
              Não foi possível verificar o status do seu pagamento. Entre em contato conosco se o problema persistir.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={verificarPagamento}
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '12px 30px',
                  borderRadius: '25px',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Tentar Novamente
              </button>
              <Link 
                to="/" 
                style={{
                  background: 'transparent',
                  color: '#667eea',
                  padding: '12px 30px',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  border: '2px solid #667eea'
                }}
              >
                Voltar ao Início
              </Link>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default CheckoutSucesso;
