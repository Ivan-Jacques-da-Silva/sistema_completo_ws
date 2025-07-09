
import { Link } from 'react-router-dom';

function CheckoutCancelado() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
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
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 30px',
          fontSize: '40px',
          color: 'white'
        }}>
          ⏸
        </div>
        
        <h2 style={{ 
          color: '#ff6b6b', 
          marginBottom: '20px', 
          fontSize: '32px', 
          fontWeight: '700' 
        }}>
          Pagamento Cancelado
        </h2>
        
        <p style={{ 
          color: '#333', 
          fontSize: '18px', 
          marginBottom: '30px',
          lineHeight: '1.6'
        }}>
          Seu pagamento foi cancelado. Você pode tentar novamente a qualquer momento ou explorar outras opções disponíveis.
        </p>
        
        <div style={{
          background: 'linear-gradient(135deg, #fff5f5, #ffeaea)',
          border: '2px solid #ff6b6b',
          borderRadius: '15px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <p style={{ color: '#c62828', margin: 0, fontSize: '14px' }}>
            <strong>💡 Dica:</strong> Se você encontrou algum problema durante o processo, nossa equipe está pronta para ajudar!
          </p>
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          justifyContent: 'center', 
          flexWrap: 'wrap' 
        }}>
          <Link 
            to="/andares" 
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
            Ver Salas Disponíveis
          </Link>
          
          <Link 
            to="/" 
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
            Voltar ao Início
          </Link>
          
          <Link 
            to="/contato" 
            style={{
              background: 'transparent',
              color: '#ff6b6b',
              padding: '12px 30px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: '600',
              border: '2px solid #ff6b6b',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#ff6b6b';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#ff6b6b';
            }}
          >
            Falar Conosco
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCancelado;
