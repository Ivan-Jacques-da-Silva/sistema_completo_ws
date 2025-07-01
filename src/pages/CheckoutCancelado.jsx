
import React from 'react';
import { Link } from 'react-router-dom';

function CheckoutCancelado() {
  return (
    <div className="container mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <div className="text-warning mb-4">
            <i className="bi bi-exclamation-triangle-fill" style={{fontSize: '4rem'}}></i>
          </div>
          <h2 className="text-warning mb-3">Pagamento Cancelado</h2>
          <p className="lead mb-4">
            Você cancelou o processo de pagamento. A sala continua disponível para reserva.
          </p>
          <div className="mt-4">
            <Link to="/andares" className="btn btn-primary me-3">
              Tentar Novamente
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
