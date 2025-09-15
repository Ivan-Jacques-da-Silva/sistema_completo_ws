
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import { Building, MapPin, DollarSign } from 'lucide-react';

const ResaleShowcase = () => {
  const [filtros, setFiltros] = useState({
    area: '',
    preco: '',
    andar: ''
  });

  const anuncios = [
    {
      id: 1,
      sala: 'SALA 1205 - 12° ANDAR',
      area: '78.2 m²',
      preco: 'R$ 1.350.000',
      status: 'Pronto para morar',
      imagem: '/src/img/salas/sala1.png'
    },
    {
      id: 2,
      sala: 'SALA 1205 - 12° ANDAR',
      area: '78.2 m²',
      preco: '',
      status: 'Pronto para morar',
      imagem: '/src/img/salas/sala2.png'
    },
    {
      id: 3,
      sala: 'SALA 1205 - 12° ANDAR',
      area: '78.2 m²',
      preco: '',
      status: 'Pronto para morar',
      imagem: '/src/img/salas/sala3.png'
    },
    {
      id: 4,
      sala: 'SALA 1205 - 12° ANDAR',
      area: '78.2 m²',
      preco: '',
      status: 'Pronto para morar',
      imagem: '/src/img/salas/sala4.png'
    },
    {
      id: 5,
      sala: 'SALA 1205 - 12° ANDAR',
      area: '78.2 m²',
      preco: '',
      status: 'Pronto para morar',
      imagem: '/src/img/salas/sala5.png'
    },
    {
      id: 6,
      sala: 'SALA 1205 - 12° ANDAR',
      area: '78.2 m²',
      preco: 'R$ 1.350.000',
      status: 'Pronto para morar',
      imagem: '/src/img/salas/sala6.png'
    }
  ];

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, #001A47 0%, #003875 100%)',
          color: 'white',
          padding: '2rem 0'
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="d-flex align-items-center">
                <Building size={32} className="me-3" />
                <div>
                  <h2 className="mb-0">WALL STREET CORPORATE</h2>
                  <div style={{ color: '#FF6B35' }}>RESALE SHOWCASE</div>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex gap-2 justify-content-end">
                <Button 
                  variant="outline-light" 
                  size="sm"
                  style={{ borderColor: '#FF6B35', color: '#FF6B35' }}
                >
                  ÁREA
                </Button>
                <Button 
                  variant="outline-light" 
                  size="sm"
                  style={{ borderColor: '#FF6B35', color: '#FF6B35' }}
                >
                  PREÇO
                </Button>
                <Button 
                  style={{ backgroundColor: '#FF6B35', border: 'none' }}
                  size="sm"
                >
                  ANDAR ▼
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Filtros */}
      <Container className="py-4">
        <Row className="mb-4">
          <Col md={3}>
            <Form.Select 
              value={filtros.area}
              onChange={(e) => setFiltros({...filtros, area: e.target.value})}
            >
              <option value="">Todas as áreas</option>
              <option value="50-70">50-70 m²</option>
              <option value="70-90">70-90 m²</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select 
              value={filtros.preco}
              onChange={(e) => setFiltros({...filtros, preco: e.target.value})}
            >
              <option value="">Todas as faixas</option>
              <option value="1000000-1500000">R$ 1M - 1.5M</option>
              <option value="1500000-2000000">R$ 1.5M - 2M</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select 
              value={filtros.andar}
              onChange={(e) => setFiltros({...filtros, andar: e.target.value})}
            >
              <option value="">Todos os andares</option>
              <option value="10-15">10° - 15° andar</option>
              <option value="15-20">15° - 20° andar</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Button 
              variant="outline-primary" 
              className="w-100"
              style={{ borderColor: '#FF6B35', color: '#FF6B35' }}
            >
              Filtrar
            </Button>
          </Col>
        </Row>

        {/* Grid de Anúncios */}
        <Row>
          {anuncios.map((anuncio) => (
            <Col md={4} key={anuncio.id} className="mb-4">
              <Card className="border-0 shadow-sm h-100">
                <div style={{ position: 'relative' }}>
                  <Card.Img 
                    variant="top" 
                    src={anuncio.imagem}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  {anuncio.preco && (
                    <Badge 
                      style={{ 
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: '#FF6B35',
                        fontSize: '14px',
                        padding: '8px 12px'
                      }}
                    >
                      {anuncio.preco}
                    </Badge>
                  )}
                </div>
                <Card.Body>
                  <h6 style={{ color: '#001A47', fontWeight: 'bold' }}>
                    {anuncio.sala}
                  </h6>
                  <div className="d-flex align-items-center mb-2 text-muted">
                    <MapPin size={16} className="me-1" />
                    {anuncio.area}
                  </div>
                  <div className="mb-3">
                    <Badge 
                      bg="success" 
                      className="small"
                    >
                      STATUS: {anuncio.status}
                    </Badge>
                  </div>
                  <Button 
                    style={{ backgroundColor: '#FF6B35', border: 'none' }}
                    className="w-100"
                  >
                    FALAR COM VENDEDOR
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Paginação */}
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" style={{ color: '#FF6B35' }}>‹</a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#" style={{ backgroundColor: '#FF6B35', borderColor: '#FF6B35' }}>1</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" style={{ color: '#FF6B35' }}>2</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" style={{ color: '#FF6B35' }}>3</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" style={{ color: '#FF6B35' }}>›</a>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  );
};

export default ResaleShowcase;
