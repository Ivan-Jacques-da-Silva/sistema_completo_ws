
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
      // TODO: Implementar StripeAPI.getSessionStatus se não existir
      const response = await fetch(`${CONFIG.API_URL}/stripe/session/${sessionId}`);
      const resultado = await response.json();
      
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
              <div className="text-success mb-4">
                <i className="bi bi-check-circle-fill" style={{fontSize: '4rem'}}></i>
              </div>
              <h2 className="text-success mb-3">Pagamento Confirmado!</h2>
              <p className="lead mb-4">
                Sua reserva foi processada com sucesso.
              </p>
              {dadosSessao?.metadata?.nome_sala && (
                <div className="alert alert-success">
                  <strong>Sala reservada:</strong> {dadosSessao.metadata.nome_sala}
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
          )}

          {status === 'pendente' && (
            <div>
              <div className="text-warning mb-4">
                <i className="bi bi-clock-fill" style={{fontSize: '4rem'}}></i>
              </div>
              <h2 className="text-warning mb-3">Pagamento Pendente</h2>
              <p className="lead mb-4">
                Seu pagamento ainda está sendo processado. Você receberá uma confirmação em breve.
              </p>
              <div className="mt-4">
                <button onClick={verificarPagamento} className="btn btn-primary me-3">
                  Verificar Novamente
                </button>
                <Link to="/" className="btn btn-outline-primary">
                  Voltar ao Início
                </Link>
              </div>
            </div>
          )}

          {status === 'erro' && (
            <div>
              <div className="text-danger mb-4">
                <i className="bi bi-x-circle-fill" style={{fontSize: '4rem'}}></i>
              </div>
              <h2 className="text-danger mb-3">Erro na Verificação</h2>
              <p className="lead mb-4">
                Não foi possível verificar o status do seu pagamento. Entre em contato conosco se o problema persistir.
              </p>
              <div className="mt-4">
                <button onClick={verificarPagamento} className="btn btn-primary me-3">
                  Tentar Novamente
                </button>
                <Link to="/" className="btn btn-outline-primary">
                  Voltar ao Início
                </Link>
              </div>
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
