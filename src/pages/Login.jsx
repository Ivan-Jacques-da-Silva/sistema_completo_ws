
import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Config from '../Config';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [tentativas, setTentativas] = useState(0);
  const navigate = useNavigate();

  // Verificar se já está autenticado
  useEffect(() => {
    if (Config.isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);

  // Limpar erro quando usuário digita
  useEffect(() => {
    if (erro) {
      setErro('');
    }
  }, [usuario, senha]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificar tentativas excessivas
    if (tentativas >= 5) {
      setErro('Muitas tentativas de login. Aguarde alguns minutos.');
      return;
    }

    setLoading(true);
    setErro('');

    try {
      // Validação local
      if (!usuario.trim() || !senha.trim()) {
        setErro('Usuário e senha são obrigatórios');
        setLoading(false);
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), Config.requestTimeout);

      // Requisição sem prefixo /api
      const response = await fetch(`${Config.api_url}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario: usuario.trim(), senha }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (data.sucesso) {
        // Armazenar token e dados do usuário
        localStorage.setItem('admin-token', data.token);
        if (data.user) {
          localStorage.setItem('user-data', JSON.stringify(data.user));
        }
        
        // Limpar formulário e redirecionar
        setUsuario('');
        setSenha('');
        setTentativas(0);
        navigate('/admin');
      } else {
        setErro(data.mensagem || 'Credenciais inválidas');
        setTentativas(prev => prev + 1);
      }
    } catch (error) {
      console.error('Erro no login:', error);
      
      if (error.name === 'AbortError') {
        setErro('Timeout: A requisição demorou muito para responder');
      } else if (error.message.includes('Failed to fetch')) {
        setErro('Erro de conexão: Verifique sua internet');
      } else {
        setErro('Erro ao fazer login. Tente novamente.');
      }
      
      setTentativas(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <h3 style={{ color: '#001A47' }}>
              Painel Administrativo
            </h3>
            <p className="text-muted">Wall Street NR</p>
          </div>

          {erro && (
            <Alert variant="danger" className="d-flex align-items-center">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {erro}
            </Alert>
          )}

          {tentativas >= 3 && tentativas < 5 && (
            <Alert variant="warning" className="d-flex align-items-center">
              <i className="bi bi-shield-exclamation me-2"></i>
              Atenção: {5 - tentativas} tentativas restantes
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>
                <i className="bi bi-person-fill me-2"></i>
                Usuário
              </Form.Label>
              <Form.Control
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
                placeholder="Digite seu usuário"
                disabled={loading || tentativas >= 5}
                autoComplete="username"
                maxLength="50"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>
                <i className="bi bi-lock-fill me-2"></i>
                Senha
              </Form.Label>
              <Form.Control
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                placeholder="Digite sua senha"
                disabled={loading || tentativas >= 5}
                autoComplete="current-password"
                maxLength="100"
              />
            </Form.Group>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-100 d-flex align-items-center justify-content-center"
              disabled={loading || tentativas >= 5}
              style={{ backgroundColor: '#001A47', border: 'none' }}
            >
              {loading ? (
                <>
                  <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                  Entrando...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Entrar
                </>
              )}
            </Button>
          </Form>

          <div className="text-center mt-4">
            <small className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              Usuário: admin | Senha: admin123
            </small>
          </div>

          <div className="text-center mt-2">
            <small className="text-muted">
              Sistema seguro com auditoria de acessos
            </small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
