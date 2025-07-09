
import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Config from '../Config';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    try {
      const response = await fetch(`${Config.api_url}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, senha })
      });

      const data = await response.json();

      if (data.sucesso) {
        localStorage.setItem('admin-token', data.token);
        // Redirecionar para a página que tentou acessar ou para /admin por padrão
        const redirectTo = new URLSearchParams(window.location.search).get('redirect') || '/admin';
        navigate(redirectTo, { replace: true });
      } else {
        setErro(data.mensagem);
      }
    } catch (error) {
      setErro('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body className="p-4">
          <h3 className="text-center mb-4" style={{ color: '#001A47' }}>
            Painel Administrativo
          </h3>
          
          {erro && <Alert variant="danger">{erro}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Usuário</Form.Label>
              <Form.Control
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
                placeholder="Digite seu usuário"
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                placeholder="Digite sua senha"
              />
            </Form.Group>
            
            <Button 
              type="submit" 
              variant="primary" 
              className="w-100"
              disabled={loading}
              style={{ backgroundColor: '#001A47', border: 'none' }}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </Form>
          
          
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
