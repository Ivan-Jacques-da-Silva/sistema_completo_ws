
import React, { useState } from 'react';
import { Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import { 
  Home, 
  DollarSign, 
  Eye, 
  TrendingUp, 
  MapPin, 
  Calendar,
  Package,
  ShoppingCart,
  Building
} from 'lucide-react';

const PortfolioContent = () => {
  const [salaSelecionada, setSalaSelecionada] = useState(null);

  // Dados das propriedades do usuário
  const propriedades = [
    {
      id: 1,
      nome: 'Sala 1008',
      andar: 10,
      area: 68.0,
      posicao: 'Norte',
      valorCompra: 1200000,
      valorAtual: 1380000,
      valorizacao: 15,
      status: 'Ocupada',
      inquilino: 'Tech Solutions Ltda',
      rendaMensal: 8500,
      dataVencimento: '15/02/2025',
      imagem: '/src/img/salas/sala1.png'
    },
    {
      id: 2,
      nome: 'Sala 1116',
      andar: 11,
      area: 76.0,
      posicao: 'Sul',
      valorCompra: 1350000,
      valorAtual: 1580000,
      valorizacao: 17,
      status: 'Disponível',
      inquilino: null,
      rendaMensal: 0,
      dataVencimento: null,
      imagem: '/src/img/salas/sala2.png'
    },
    {
      id: 3,
      nome: 'Sala 1224',
      andar: 12,
      area: 84.0,
      posicao: 'Leste',
      valorCompra: 1500000,
      valorAtual: 1785000,
      valorizacao: 19,
      status: 'Ocupada',
      inquilino: 'Consultoria ABC',
      rendaMensal: 9200,
      dataVencimento: '28/03/2025',
      imagem: '/src/img/salas/sala3.png'
    }
  ];

  const salaAtual = propriedades.find(p => p.id === salaSelecionada);

  return (
    <div>
      <h2 style={{ color: '#0f172a', fontWeight: '800', fontSize: '32px' }} className="mb-4">
        <Home size={36} className="me-3" style={{ color: '#f59e0b' }} />
        Minhas Propriedades
      </h2>
      <p className="text-muted mb-5" style={{ fontSize: '16px', fontWeight: '500' }}>
        Gerencie suas unidades próprias no Wall Street Corporate
      </p>

      <Row>
        {/* Lista de Propriedades */}
        <Col lg={8} className="mb-4">
          <Card className="border-0 shadow-lg" style={{ borderRadius: '24px' }}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 style={{ color: '#0f172a', fontWeight: '700' }}>Selecione a Unidade a Ser Vendida</h4>
                <Badge 
                  style={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    fontSize: '14px',
                    padding: '8px 16px',
                    borderRadius: '20px'
                  }}
                >
                  {propriedades.length} Unidades Próprias
                </Badge>
              </div>

              <Row>
                {propriedades.map((propriedade) => (
                  <Col md={6} key={propriedade.id} className="mb-3">
                    <Card 
                      className={`border-2 h-100 ${salaSelecionada === propriedade.id ? 'border-warning' : 'border-light'}`}
                      style={{ 
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        transform: salaSelecionada === propriedade.id ? 'scale(1.02)' : 'scale(1)',
                        boxShadow: salaSelecionada === propriedade.id ? '0 8px 25px rgba(245,158,11,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                      onClick={() => setSalaSelecionada(propriedade.id)}
                    >
                      <div style={{ height: '160px', overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
                        <img 
                          src={propriedade.imagem}
                          alt={propriedade.nome}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      <Card.Body className="p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0" style={{ color: '#0f172a', fontWeight: '700' }}>
                            {propriedade.nome}
                          </h6>
                          <Badge 
                            bg={propriedade.status === 'Ocupada' ? 'success' : 'warning'}
                            style={{ fontSize: '11px' }}
                          >
                            {propriedade.status}
                          </Badge>
                        </div>
                        
                        <p className="text-muted small mb-2" style={{ fontWeight: '500' }}>
                          <MapPin size={12} className="me-1" />
                          {propriedade.area} m² • {propriedade.andar}° Andar • {propriedade.posicao}
                        </p>
                        
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="small text-muted" style={{ fontWeight: '600' }}>Valorização</div>
                            <div style={{ fontWeight: '800', color: '#10b981', fontSize: '16px' }}>
                              +{propriedade.valorizacao}%
                            </div>
                          </div>
                          <div className="text-end">
                            <div className="small text-muted" style={{ fontWeight: '600' }}>Valor Atual</div>
                            <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>
                              R$ {(propriedade.valorAtual / 1000000).toFixed(1)}M
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Informações da Sala Selecionada */}
        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '24px' }}>
            <Card.Body className="p-4">
              {!salaAtual ? (
                <div className="text-center py-5">
                  <Building size={60} className="text-muted mb-3" />
                  <h5 className="text-muted mb-2">Selecione uma Propriedade</h5>
                  <p className="text-muted small">
                    Clique em uma das suas unidades para ver as informações detalhadas
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-4">
                    <img 
                      src={salaAtual.imagem}
                      alt={salaAtual.nome}
                      style={{ 
                        width: '100%', 
                        height: '140px', 
                        objectFit: 'cover',
                        borderRadius: '16px'
                      }}
                    />
                  </div>

                  <h4 className="mb-3" style={{ color: '#0f172a', fontWeight: '700' }}>
                    {salaAtual.nome}
                  </h4>

                  {/* Informações Básicas */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted" style={{ fontWeight: '600' }}>Área:</span>
                      <span style={{ fontWeight: '700', color: '#0f172a' }}>{salaAtual.area} m²</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted" style={{ fontWeight: '600' }}>Andar:</span>
                      <span style={{ fontWeight: '700', color: '#0f172a' }}>{salaAtual.andar}°</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted" style={{ fontWeight: '600' }}>Posição:</span>
                      <span style={{ fontWeight: '700', color: '#0f172a' }}>{salaAtual.posicao}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted" style={{ fontWeight: '600' }}>Valor de Compra:</span>
                      <span style={{ fontWeight: '700', color: '#64748b' }}>
                        R$ {salaAtual.valorCompra.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted" style={{ fontWeight: '600' }}>Valor Atual:</span>
                      <span style={{ fontWeight: '800', color: '#10b981', fontSize: '18px' }}>
                        R$ {salaAtual.valorAtual.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  {/* Status da Ocupação */}
                  {salaAtual.status === 'Ocupada' && (
                    <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: '#f0f9f4', border: '1px solid #10b981' }}>
                      <h6 style={{ color: '#059669', fontWeight: '700' }}>Ocupação Atual</h6>
                      <div className="small mb-1">
                        <strong>Inquilino:</strong> {salaAtual.inquilino}
                      </div>
                      <div className="small mb-1">
                        <strong>Renda Mensal:</strong> R$ {salaAtual.rendaMensal.toLocaleString('pt-BR')}
                      </div>
                      <div className="small">
                        <strong>Vencimento:</strong> {salaAtual.dataVencimento}
                      </div>
                    </div>
                  )}

                  {/* Valor de Venda com Honorários */}
                  <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: '#fef3c7', border: '1px solid #f59e0b' }}>
                    <h6 style={{ color: '#d97706', fontWeight: '700' }}>Valor de Venda (5% Honorários)</h6>
                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#d97706' }}>
                      R$ {(salaAtual.valorAtual * 0.95).toLocaleString('pt-BR')}
                    </div>
                    <small className="text-muted">
                      Valor líquido após desconto dos honorários
                    </small>
                  </div>

                  {/* Botões de Ação */}
                  <div className="d-grid gap-2">
                    <Button 
                      style={{ 
                        background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                        border: 'none',
                        borderRadius: '16px',
                        padding: '12px',
                        fontWeight: '700',
                        boxShadow: '0 4px 15px rgba(245,158,11,0.3)'
                      }}
                    >
                      <ShoppingCart size={16} className="me-2" />
                      Colocar para Venda
                    </Button>
                    
                    <Button 
                      variant="outline-primary"
                      style={{ 
                        borderColor: '#3b82f6',
                        color: '#3b82f6',
                        borderRadius: '16px',
                        padding: '12px',
                        fontWeight: '700',
                        borderWidth: '2px'
                      }}
                    >
                      <Building size={16} className="me-2" />
                      Colocar para Alugar
                    </Button>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PortfolioContent;
