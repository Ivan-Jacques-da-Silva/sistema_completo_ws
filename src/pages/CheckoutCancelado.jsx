
import { Link } from 'react-router-dom';

function CheckoutCancelado() {
  return (
    <div className="container mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <i className="bi bi-x-circle-fill text-warning" style={{ fontSize: '4rem' }}></i>
          <h2 className="text-warning mt-3">Pagamento Cancelado</h2>
          <p className="lead">
            Sua sessão de pagamento foi cancelada. 
            Nenhuma cobrança foi realizada.
          </p>
          
          <div className="alert alert-info mt-4">
            <h5>O que aconteceu?</h5>
            <p className="mb-0">
              Você cancelou o processo de pagamento ou fechou a janela antes de completar a transação.
              A sala continua disponível e você pode tentar novamente a qualquer momento.
            </p>
          </div>

          <div className="mt-4">
            <Link to="/andares" className="btn btn-primary me-3">
              Ver Salas Disponíveis
            </Link>
            <Link to="/" className="btn btn-outline-primary">
              Voltar ao Início
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCancelado;
