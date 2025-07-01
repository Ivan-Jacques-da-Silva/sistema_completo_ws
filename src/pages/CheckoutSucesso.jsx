
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import StripeAPI from '../api/Stripe';

function CheckoutSucesso() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verificando');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      verificarPagamento();
    }
  }, [sessionId]);

  const verificarPagamento = async () => {
    try {
      const resultado = await StripeAPI.getSessionStatus(sessionId);
      
      if (resultado.payment_status === 'paid') {
        setStatus('sucesso');
      } else {
        setStatus('pendente');
      }
    } catch (error) {
      console.error('Erro ao verificar pagamento:', error);
      setStatus('erro');
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          {status === 'verificando' && (
            <div>
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Verificando...</span>
              </div>
              <h3>Verificando seu pagamento...</h3>
              <p>Aguarde alguns instantes enquanto confirmamos sua transação.</p>
            </div>
          )}

          {status === 'sucesso' && (
            <div>
              <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
              <h2 className="text-success mt-3">Pagamento Confirmado!</h2>
              <p className="lead">
                Sua pré-reserva foi processada com sucesso. 
                A sala foi reservada e você receberá mais informações em breve.
              </p>
              <div className="alert alert-info mt-4">
                <h5>Próximos Passos:</h5>
                <ul className="list-unstyled mb-0">
                  <li>• Nossa equipe entrará em contato em até 24 horas</li>
                  <li>• Você receberá um e-mail com os detalhes da reserva</li>
                  <li>• Mantenha este código de sessão para referência: <code>{sessionId}</code></li>
                </ul>
              </div>
            </div>
          )}

          {status === 'pendente' && (
            <div>
              <i className="bi bi-clock-fill text-warning" style={{ fontSize: '4rem' }}></i>
              <h2 className="text-warning mt-3">Pagamento Pendente</h2>
              <p className="lead">
                Seu pagamento ainda está sendo processado. 
                Você receberá uma confirmação assim que for aprovado.
              </p>
            </div>
          )}

          {status === 'erro' && (
            <div>
              <i className="bi bi-exclamation-triangle-fill text-danger" style={{ fontSize: '4rem' }}></i>
              <h2 className="text-danger mt-3">Erro na Verificação</h2>
              <p className="lead">
                Ocorreu um erro ao verificar seu pagamento. 
                Entre em contato conosco se você já realizou o pagamento.
              </p>
            </div>
          )}

          <div className="mt-4">
            <Link to="/" className="btn btn-primary me-3">
              Voltar ao Início
            </Link>
            <Link to="/andares" className="btn btn-outline-primary">
              Ver Outras Salas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSucesso;
