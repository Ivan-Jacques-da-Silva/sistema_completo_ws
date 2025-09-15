import React, { useState } from 'react';
import { Card, Row, Col, Button, Badge, Table } from 'react-bootstrap';
import { 
  Clock, 
  Calculator, 
  List, 
  Building,
  MapPin,
  Eye,
  DollarSign,
  TrendingUp
} from 'lucide-react';

const DashboardContent = () => {
  const [filtroStatus, setFiltroStatus] = useState('todos');

  // Dados simulados das unidades
  const unidades = [
    {
      id: 1,
      codigo: 'WSC-1008',
      area: 68.0,
      andar: 10,
      posicao: 'Norte',
      status: 'locada',
      valorCompra: 1200000,
      valorAtual: 1380000,
      rendaMensal: 8500,
      inquilino: 'Tech Solutions Ltda',
      roi: 15.2,
      imagem: '/src/img/salas/sala1.png'
    },
    {
      id: 2,
      codigo: 'WSC-1116',
      area: 76.0,
      andar: 11,
      posicao: 'Sul',
      status: 'venda',
      valorCompra: 1350000,
      valorAtual: 1580000,
      rendaMensal: 0,
      inquilino: null,
      roi: 17.0,
      imagem: '/src/img/salas/sala2.png'
    },
    {
      id: 3,
      codigo: 'WSC-1224',
      area: 84.0,
      andar: 12,
      posicao: 'Leste',
      status: 'propria',
      valorCompra: 1500000,
      valorAtual: 1785000,
      rendaMensal: 9200,
      inquilino: 'Consultoria ABC',
      roi: 19.0,
      imagem: '/src/img/salas/sala3.png'
    },
    {
      id: 4,
      codigo: 'WSC-0907',
      area: 72.5,
      andar: 9,
      posicao: 'Oeste',
      status: 'locada',
      valorCompra: 1300000,
      valorAtual: 1495000,
      rendaMensal: 7800,
      inquilino: 'Startup Inovação',
      roi: 14.5,
      imagem: '/src/img/salas/sala4.png'
    },
    {
      id: 5,
      codigo: 'WSC-1340',
      area: 90.0,
      andar: 13,
      posicao: 'Norte',
      status: 'venda',
      valorCompra: 1650000,
      valorAtual: 1920000,
      rendaMensal: 0,
      inquilino: null,
      roi: 16.4,
      imagem: '/src/img/salas/sala5.png'
    },
    {
      id: 6,
      codigo: 'WSC-1156',
      area: 64.0,
      andar: 11,
      posicao: 'Sul',
      status: 'propria',
      valorCompra: 1180000,
      valorAtual: 1350000,
      rendaMensal: 8200,
      inquilino: 'Digital Agency',
      roi: 14.4,
      imagem: '/src/img/salas/sala6.png'
    }
  ];

  const unidadesFiltradas = filtroStatus === 'todos' 
    ? unidades 
    : unidades.filter(u => u.status === filtroStatus);

  const totalSalas = unidades.length;
  const salasVendidas = unidades.filter(u => u.status === 'venda').length;
  const valorTotalAtual = unidades.reduce((acc, u) => acc + u.valorAtual, 0);
  const minhasUnidades = unidades.filter(u => u.status === 'propria').length;

  const getStatusColor = (status) => {
    switch(status) {
      case 'locada': return { bg: '#3b82f6', text: 'Locada' };
      case 'venda': return { bg: '#f59e0b', text: 'À Venda' };
      case 'propria': return { bg: '#10b981', text: 'Própria' };
      default: return { bg: '#64748b', text: 'Indefinido' };
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 style={{ 
            color: '#3b82f6', 
            fontWeight: '800', 
            marginBottom: '8px',
            fontSize: '32px'
          }}>
            Gestão de Unidades
          </h1>
          <p className="text-muted mb-0" style={{ fontSize: '16px', fontWeight: '500' }}>
            Wall Street Corporate
          </p>
        </div>
      </div>

      {/* Cards de Features */}
      <Row className="mb-5">
        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '24px' }}>
            <Card.Body className="p-4 text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  boxShadow: '0 8px 25px rgba(59,130,246,0.3)'
                }}
              >
                <Clock size={36} className="text-white" />
              </div>
              <h4 style={{ color: '#3b82f6', fontWeight: '700', marginBottom: '12px' }}>
                Status Dinâmico
              </h4>
              <p className="text-muted small" style={{ fontWeight: '500' }}>
                Visualização clara do status de cada unidade com badges coloridos para identificação rápida.
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '24px' }}>
            <Card.Body className="p-4 text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  boxShadow: '0 8px 25px rgba(16,185,129,0.3)'
                }}
              >
                <Calculator size={36} className="text-white" />
              </div>
              <h4 style={{ color: '#10b981', fontWeight: '700', marginBottom: '12px' }}>
                ROI Calculado
              </h4>
              <p className="text-muted small" style={{ fontWeight: '500' }}>
                Cálculo automático do retorno sobre investimento para cada unidade, facilitando a tomada de decisão.
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '24px' }}>
            <Card.Body className="p-4 text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                  boxShadow: '0 8px 25px rgba(245,158,11,0.3)'
                }}
              >
                <List size={36} className="text-white" />
              </div>
              <h4 style={{ color: '#f59e0b', fontWeight: '700', marginBottom: '12px' }}>
                Ações Específicas
              </h4>
              <p className="text-muted small" style={{ fontWeight: '500' }}>
                Botões de ação personalizados para cada status: gerenciar vendas e locações.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filtros de Status */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex gap-2 mb-3">
            <Button
              size="sm"
              style={{
                background: filtroStatus === 'todos' ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' : 'transparent',
                color: filtroStatus === 'todos' ? 'white' : '#3b82f6',
                border: filtroStatus === 'todos' ? 'none' : '2px solid #3b82f6',
                borderRadius: '20px',
                padding: '8px 16px',
                fontWeight: '600'
              }}
              onClick={() => setFiltroStatus('todos')}
            >
              🏠 Todas
            </Button>
            <Button
              size="sm"
              style={{
                background: filtroStatus === 'locada' ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' : 'transparent',
                color: filtroStatus === 'locada' ? 'white' : '#3b82f6',
                border: filtroStatus === 'locada' ? 'none' : '2px solid #3b82f6',
                borderRadius: '20px',
                padding: '8px 16px',
                fontWeight: '600'
              }}
              onClick={() => setFiltroStatus('locada')}
            >
              🏢 Locada
            </Button>
            <Button
              size="sm"
              style={{
                background: filtroStatus === 'venda' ? 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)' : 'transparent',
                color: filtroStatus === 'venda' ? 'white' : '#f59e0b',
                border: filtroStatus === 'venda' ? 'none' : '2px solid #f59e0b',
                borderRadius: '20px',
                padding: '8px 16px',
                fontWeight: '600'
              }}
              onClick={() => setFiltroStatus('venda')}
            >
              💰 À Venda
            </Button>
            <Button
              size="sm"
              style={{
                background: filtroStatus === 'propria' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
                color: filtroStatus === 'propria' ? 'white' : '#10b981',
                border: filtroStatus === 'propria' ? 'none' : '2px solid #10b981',
                borderRadius: '20px',
                padding: '8px 16px',
                fontWeight: '600'
              }}
              onClick={() => setFiltroStatus('propria')}
            >
              🏠 Própria
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Dashboard Principal */}
        <Col lg={8} className="mb-4">
          <Card className="border-0 shadow-lg" style={{ borderRadius: '24px' }}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 style={{ color: '#0f172a', fontWeight: '700' }}>Dashboard Principal</h4>
                <Badge style={{ 
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  fontSize: '14px',
                  padding: '8px 16px',
                  borderRadius: '20px'
                }}>
                  Área do Cliente
                </Badge>
              </div>

              {/* Métricas */}
              <Row className="mb-4">
                <Col md={3} className="text-center mb-3">
                  <div style={{ color: '#3b82f6', fontSize: '14px', fontWeight: '600' }}>🏢 Ttl de Salas</div>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a' }}>{totalSalas}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Total disponível</div>
                </Col>
                <Col md={3} className="text-center mb-3">
                  <div style={{ color: '#10b981', fontSize: '14px', fontWeight: '600' }}>📊 Salas Vendidas</div>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a' }}>{salasVendidas}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Unidades vendidas</div>
                </Col>
                <Col md={3} className="text-center mb-3">
                  <div style={{ color: '#f59e0b', fontSize: '14px', fontWeight: '600' }}>💰 Valor Médio Unitário</div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>
                    R$ {(valorTotalAtual / totalSalas / 1000000).toFixed(1)}M
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Por unidade</div>
                </Col>
                <Col md={3} className="text-center mb-3">
                  <div style={{ color: '#10b981', fontSize: '14px', fontWeight: '600' }}>🏠 Minhas Unidades</div>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a' }}>{minhasUnidades}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Unidades próprias</div>
                </Col>
              </Row>

              {/* Grid de Unidades */}
              <Row>
                {unidadesFiltradas.map((unidade) => (
                  <Col md={6} lg={4} key={unidade.id} className="mb-3">
                    <Card 
                      className="border-2 h-100"
                      style={{ 
                        borderRadius: '16px',
                        borderColor: getStatusColor(unidade.status).bg,
                        position: 'relative'
                      }}
                    >
                      <div style={{ height: '120px', overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
                        <img 
                          src={unidade.imagem}
                          alt={unidade.codigo}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover'
                          }}
                        />
                        <Badge 
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            background: getStatusColor(unidade.status).bg,
                            fontSize: '11px',
                            borderRadius: '12px'
                          }}
                        >
                          {getStatusColor(unidade.status).text}
                        </Badge>
                      </div>
                      <Card.Body className="p-3">
                        <h6 className="mb-1" style={{ color: '#0f172a', fontWeight: '700' }}>
                          {unidade.codigo}
                        </h6>
                        <p className="text-muted small mb-2" style={{ fontWeight: '500' }}>
                          {unidade.area} m² • {unidade.andar}° Andar
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="small text-muted" style={{ fontWeight: '600' }}>ROI</div>
                            <div style={{ fontWeight: '800', color: '#10b981', fontSize: '16px' }}>
                              {unidade.roi}%
                            </div>
                          </div>
                          <Button 
                            size="sm"
                            style={{ 
                              background: getStatusColor(unidade.status).bg,
                              border: 'none',
                              borderRadius: '12px',
                              fontWeight: '600',
                              padding: '6px 12px',
                              fontSize: '12px'
                            }}
                          >
                            <Eye size={12} className="me-1" />
                            Ver
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Sidebar Direita */}
        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-lg mb-4" style={{ borderRadius: '24px' }}>
            <Card.Body className="p-4">
              <h5 style={{ color: '#0f172a', fontWeight: '700', marginBottom: '20px' }}>
                Status para Locação
              </h5>
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3 p-3 rounded-3" style={{ backgroundColor: '#dbeafe' }}>
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                    }}
                  >
                    <Building size={20} className="text-white" />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: '#0f172a' }}>Divulgar anúncio</div>
                    <small className="text-muted" style={{ fontWeight: '500' }}>Oportunidades de locação</small>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-3 p-3 rounded-3" style={{ backgroundColor: '#f0f9f4' }}>
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    }}
                  >
                    <DollarSign size={20} className="text-white" />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: '#0f172a' }}>Valor R$ 5.500,00</div>
                    <small className="text-muted" style={{ fontWeight: '500' }}>Valor de locação</small>
                  </div>
                </div>
              </div>

              <Button 
                className="w-100"
                style={{ 
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '12px',
                  fontWeight: '700'
                }}
              >
                Anunciar Venda
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;