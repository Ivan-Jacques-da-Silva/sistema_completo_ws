
import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import fundoHeader from '../img/fundoHeader.webp';

const LoginMembro = () => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  // Função para formatar CPF
  const formatarCPF = (valor) => {
    // Remove tudo que não é número
    const numeros = valor.replace(/\D/g, '');
    
    // Aplica a máscara
    if (numeros.length <= 3) {
      return numeros;
    } else if (numeros.length <= 6) {
      return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
    } else if (numeros.length <= 9) {
      return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`;
    } else {
      return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9, 11)}`;
    }
  };

  // Função para remover formatação do CPF
  const removerFormatacaoCPF = (cpfFormatado) => {
    return cpfFormatado.replace(/\D/g, '');
  };

  // Handler para mudança no campo CPF
  const handleCPFChange = (e) => {
    const valor = e.target.value;
    const cpfFormatado = formatarCPF(valor);
    setCpf(cpfFormatado);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    // Remove formatação do CPF para comparação
    const cpfLimpo = removerFormatacaoCPF(cpf);

    // Simulação de login - pode ser integrado com backend depois
    setTimeout(() => {
      if (cpfLimpo === '12345678900' && senha === 'demo123') {
        localStorage.setItem('membro-token', 'membro-token-123');
        localStorage.setItem('membro-nome', 'Gabriel Silva');
        navigate('/area-membro');
      } else {
        setErro('CPF ou senha incorretos');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 26, 71, 0.8), rgba(0, 26, 71, 0.8)), url(${fundoHeader})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Container>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <Card 
              className="shadow-lg border-0"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px'
              }}
            >
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #001A47 0%, #003875 100%)'
                    }}
                  >
                    <i className="bi bi-person-circle text-white" style={{ fontSize: '2.5rem' }}></i>
                  </div>
                  <h2 style={{ color: '#001A47', fontWeight: 'bold' }}>WALL STREET</h2>
                  <h3 style={{ color: '#FF6B35', fontWeight: 'bold' }}>CORPORATE</h3>
                  <h4 className="mt-4 mb-0" style={{ color: '#001A47' }}>ÁREA DO MEMBRO</h4>
                </div>
                
                {erro && <Alert variant="danger">{erro}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      value={cpf}
                      onChange={handleCPFChange}
                      required
                      placeholder="CPF (000.000.000-00)"
                      maxLength="14"
                      style={{
                        borderRadius: '15px',
                        border: '2px solid #e9ecef',
                        padding: '15px 20px',
                        fontSize: '16px'
                      }}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="password"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required
                      placeholder="Senha"
                      style={{
                        borderRadius: '15px',
                        border: '2px solid #e9ecef',
                        padding: '15px 20px',
                        fontSize: '16px'
                      }}
                    />
                  </Form.Group>
                  
                  <Button 
                    type="submit" 
                    className="w-100 mb-4"
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(135deg, #001A47 0%, #003875 100%)',
                      border: 'none',
                      borderRadius: '15px',
                      padding: '15px',
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}
                  >
                    {loading ? 'ENTRANDO...' : 'ENTRAR'}
                  </Button>
                </Form>
                
                <div className="d-flex justify-content-between">
                  <a href="#" style={{ color: '#FF6B35', textDecoration: 'underline' }}>
                    Esqueceu minha senha?
                  </a>
                  <a href="#" style={{ color: '#FF6B35', textDecoration: 'underline' }}>
                    Criar conta
                  </a>
                </div>
                
                <div className="text-center mt-4">
                  <small className="text-muted">
                    Demo: CPF: 123.456.789-00 | Senha: demo123
                  </small>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginMembro;
