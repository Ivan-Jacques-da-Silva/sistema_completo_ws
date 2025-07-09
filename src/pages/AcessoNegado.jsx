
import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AcessoNegado = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '100%', maxWidth: '500px' }}>
        <Card.Body className="text-center p-5">
          <div className="mb-4">
            <i className="bi bi-shield-x" style={{ fontSize: '4rem', color: '#dc3545' }}></i>
          </div>
          
          <h2 className="text-danger mb-3">Acesso Negado</h2>
          
          <p className="text-muted mb-4">
            Você não tem permissão para acessar esta área do sistema. 
            Por favor, faça login com uma conta autorizada.
          </p>
          
          <div className="d-flex gap-2 justify-content-center">
            <Button 
              variant="primary" 
              onClick={() => navigate('/login')}
              style={{ backgroundColor: '#001A47', border: 'none' }}
            >
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Fazer Login
            </Button>
            
            <Button 
              variant="outline-secondary" 
              onClick={() => navigate('/')}
            >
              <i className="bi bi-house me-2"></i>
              Voltar ao Início
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AcessoNegado;
