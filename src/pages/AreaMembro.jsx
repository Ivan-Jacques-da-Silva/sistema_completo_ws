
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Nav, Navbar, Form, Badge, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Building, 
  TrendingUp, 
  BarChart3, 
  MessageCircle, 
  FileText,
  Settings,
  LogOut,
  User,
  DollarSign,
  Eye,
  Phone,
  Mail,
  Calendar,
  Package
} from 'lucide-react';

const AreaMembro = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();
  const membroNome = localStorage.getItem('membro-nome') || 'Gabriel Silva';

  useEffect(() => {
    const token = localStorage.getItem('membro-token');
    if (!token) {
      navigate('/login-membro');
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('membro-token');
    localStorage.removeItem('membro-nome');
    navigate('/login-membro');
  };

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', component: <DashboardContent /> },
    { id: 'propriedades', icon: Building, label: 'Minhas Propriedades', component: <PropriedadesContent /> },
    { id: 'vitrine', icon: DollarSign, label: 'Vitrine de Revenda', component: <VitrineContent /> },
    { id: 'mensagens', icon: MessageCircle, label: 'Mensagens', component: <MensagensContent /> },
    { id: 'documentos', icon: FileText, label: 'Documentos', component: <DocumentosContent /> },
    { id: 'configuracoes', icon: Settings, label: 'Configurações', component: <ConfiguracoesContent /> }
  ];

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <Navbar 
        expand="lg" 
        style={{ 
          background: 'linear-gradient(135deg, #001A47 0%, #003875 100%)',
          padding: '1rem 0',
          boxShadow: '0 4px 20px rgba(0,26,71,0.3)'
        }}
      >
        <Container fluid>
          <Navbar.Brand className="text-white d-flex align-items-center">
            <div 
              className="d-inline-flex align-items-center justify-content-center rounded-circle me-3"
              style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #FF6B35 0%, #FF8A65 100%)',
                boxShadow: '0 4px 15px rgba(255,107,53,0.4)'
              }}
            >
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>W</span>
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>WALL STREET</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>CORPORATE</div>
            </div>
          </Navbar.Brand>
          
          <div className="d-flex align-items-center text-white">
            <span className="me-3 d-none d-md-block">Bem-vindo, {membroNome}</span>
            <Button 
              variant="outline-light" 
              size="sm" 
              onClick={logout}
              className="d-flex align-items-center"
              style={{
                borderRadius: '25px',
                padding: '8px 16px',
                transition: 'all 0.3s ease'
              }}
            >
              <LogOut size={16} className="me-2" />
              <span className="d-none d-md-inline">Sair</span>
            </Button>
          </div>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col lg={2} md={3} className="p-0 d-none d-md-block">
            <div 
              style={{ 
                background: 'linear-gradient(180deg, #001A47 0%, #003875 100%)',
                minHeight: 'calc(100vh - 80px)',
                padding: '2rem 0',
                boxShadow: '4px 0 20px rgba(0,26,71,0.2)'
              }}
            >
              <Nav className="flex-column">
                {menuItems.map((item) => (
                  <Nav.Link
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`d-flex align-items-center px-4 py-3 text-white position-relative ${
                      activeSection === item.id ? 'active-menu-item' : ''
                    }`}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: activeSection === item.id ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      borderLeft: activeSection === item.id ? '4px solid #FF6B35' : '4px solid transparent',
                      transition: 'all 0.3s ease',
                      marginBottom: '5px'
                    }}
                  >
                    <item.icon size={20} className="me-3" />
                    <span className="d-none d-lg-inline">{item.label}</span>
                  </Nav.Link>
                ))}
              </Nav>
            </div>
          </Col>

          {/* Mobile Menu */}
          <div className="d-md-none">
            <div className="bg-white border-bottom p-3">
              <select 
                className="form-select"
                value={activeSection}
                onChange={(e) => setActiveSection(e.target.value)}
                style={{ borderRadius: '10px' }}
              >
                {menuItems.map((item) => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Main Content */}
          <Col lg={10} md={9} className="p-4">
            {menuItems.find(item => item.id === activeSection)?.component}
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .active-menu-item::before {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 30px;
          background: #FF6B35;
          border-radius: 2px 0 0 2px;
        }
      `}</style>
    </div>
  );
};

// Dashboard reformulado
const DashboardContent = () => {
  const valorizacaoData = [
    { mes: 'Jan', valor: 1250000 },
    { mes: 'Fev', valor: 1280000 },
    { mes: 'Mar', valor: 1320000 },
    { mes: 'Abr', valor: 1350000 },
    { mes: 'Mai', valor: 1390000 },
    { mes: 'Jun', valor: 1420000 }
  ];

  const valorInicial = 1200000;
  const valorAtual = 1420000;
  const valorizacao = ((valorAtual - valorInicial) / valorInicial * 100).toFixed(1);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: '#001A47', fontWeight: 'bold' }}>Dashboard</h2>
        <Badge bg="success" style={{ fontSize: '14px', padding: '8px 15px' }}>
          Status: Ativo
        </Badge>
      </div>

      {/* Cards principais */}
      <Row className="mb-4">
        <Col xl={3} lg={6} md={6} className="mb-4">
          <Card 
            className="border-0 shadow-sm h-100"
            style={{ 
              background: 'linear-gradient(135deg, #FF6B35 0%, #FF8A65 100%)',
              color: 'white'
            }}
          >
            <Card.Body className="text-center p-4">
              <Building size={40} className="mb-3" />
              <h3 className="mb-1">3</h3>
              <p className="mb-0 opacity-90">Salas Comerciais</p>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={3} lg={6} md={6} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center p-4">
              <div 
                className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{ width: '60px', height: '60px', background: '#e8f5e8' }}
              >
                <DollarSign size={30} style={{ color: '#28a745' }} />
              </div>
              <h5 style={{ color: '#28a745', fontWeight: 'bold' }}>
                R$ {valorInicial.toLocaleString('pt-BR')}
              </h5>
              <p className="text-muted mb-0">Valor Investido</p>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={3} lg={6} md={6} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center p-4">
              <div 
                className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{ width: '60px', height: '60px', background: '#fff3cd' }}
              >
                <TrendingUp size={30} style={{ color: '#f57c00' }} />
              </div>
              <h5 style={{ color: '#f57c00', fontWeight: 'bold' }}>
                R$ {valorAtual.toLocaleString('pt-BR')}
              </h5>
              <p className="text-muted mb-0">Valor Atual</p>
              <Badge bg="success" className="mt-1">+{valorizacao}%</Badge>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={3} lg={6} md={6} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center p-4">
              <div 
                className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{ width: '60px', height: '60px', background: '#e3f2fd' }}
              >
                <MessageCircle size={30} style={{ color: '#1976d2' }} />
              </div>
              <h3 style={{ color: '#1976d2', fontWeight: 'bold' }}>12</h3>
              <p className="text-muted mb-0">Contatos Recebidos</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Gráfico de valorização e progresso de vendas */}
      <Row className="mb-4">
        <Col lg={8} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <h5 className="mb-4" style={{ color: '#001A47' }}>Evolução da Valorização</h5>
              <div style={{ height: '250px', position: 'relative' }}>
                <svg width="100%" height="100%" viewBox="0 0 600 250">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#FF6B35', stopOpacity: 0.3 }} />
                      <stop offset="100%" style={{ stopColor: '#FF6B35', stopOpacity: 0.1 }} />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map(i => (
                    <line 
                      key={i}
                      x1="50" 
                      y1={50 + i * 40} 
                      x2="550" 
                      y2={50 + i * 40}
                      stroke="#e0e0e0"
                      strokeWidth="1"
                    />
                  ))}
                  
                  {/* Linha de valorização */}
                  <polyline
                    fill="none"
                    stroke="#FF6B35"
                    strokeWidth="3"
                    points={valorizacaoData.map((data, index) => 
                      `${50 + index * 83.33},${250 - ((data.valor - 1200000) / 250000 * 150 + 50)}`
                    ).join(' ')}
                  />
                  
                  {/* Área preenchida */}
                  <polygon
                    fill="url(#gradient)"
                    points={`50,200 ${valorizacaoData.map((data, index) => 
                      `${50 + index * 83.33},${250 - ((data.valor - 1200000) / 250000 * 150 + 50)}`
                    ).join(' ')} 550,200`}
                  />
                  
                  {/* Pontos */}
                  {valorizacaoData.map((data, index) => (
                    <circle
                      key={index}
                      cx={50 + index * 83.33}
                      cy={250 - ((data.valor - 1200000) / 250000 * 150 + 50)}
                      r="4"
                      fill="#FF6B35"
                    />
                  ))}
                  
                  {/* Labels dos meses */}
                  {valorizacaoData.map((data, index) => (
                    <text
                      key={index}
                      x={50 + index * 83.33}
                      y={235}
                      textAnchor="middle"
                      fill="#666"
                      fontSize="12"
                    >
                      {data.mes}
                    </text>
                  ))}
                </svg>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <h5 className="mb-4" style={{ color: '#001A47' }}>Progresso de Vendas do Prédio</h5>
              <div 
                className="mx-auto mb-3 position-relative"
                style={{ width: '150px', height: '150px' }}
              >
                <svg width="150" height="150" viewBox="0 0 150 150">
                  <circle
                    cx="75"
                    cy="75"
                    r="65"
                    fill="none"
                    stroke="#e0e0e0"
                    strokeWidth="10"
                  />
                  <circle
                    cx="75"
                    cy="75"
                    r="65"
                    fill="none"
                    stroke="#FF6B35"
                    strokeWidth="10"
                    strokeDasharray={`${75 * 4.08} ${100 * 4.08}`}
                    strokeDashoffset="102"
                    transform="rotate(-90 75 75)"
                  />
                  <text
                    x="75"
                    y="75"
                    textAnchor="middle"
                    dy="7"
                    fontSize="24"
                    fontWeight="bold"
                    fill="#001A47"
                  >
                    75%
                  </text>
                </svg>
              </div>
              <h4 style={{ color: '#001A47' }}>Vendido</h4>
              <p className="text-muted">do empreendimento</p>
              <div className="mt-3 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                <small className="text-muted">Restam apenas 25% das unidades</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Resumo financeiro */}
      <Row>
        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="mb-4" style={{ color: '#001A47' }}>Resumo Financeiro</h5>
              <div className="row">
                <div className="col-6">
                  <div className="text-center mb-3">
                    <h4 style={{ color: '#28a745' }}>+R$ {(valorAtual - valorInicial).toLocaleString('pt-BR')}</h4>
                    <small className="text-muted">Valorização Total</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center mb-3">
                    <h4 style={{ color: '#FF6B35' }}>+{valorizacao}%</h4>
                    <small className="text-muted">Rentabilidade</small>
                  </div>
                </div>
              </div>
              <ProgressBar 
                now={parseFloat(valorizacao)} 
                variant="success" 
                style={{ height: '8px' }}
                className="mb-3"
              />
              <div className="text-center">
                <small className="text-muted">
                  Performance acima da média do mercado (+{valorizacao}% vs +8.2% média)
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="mb-4" style={{ color: '#001A47' }}>Próximas Ações</h5>
              <div className="d-flex align-items-center mb-3 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                <Calendar size={20} className="me-3" style={{ color: '#FF6B35' }} />
                <div>
                  <div className="fw-bold">Revisão de Portfólio</div>
                  <small className="text-muted">Agendada para 15/02/2024</small>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                <FileText size={20} className="me-3" style={{ color: '#FF6B35' }} />
                <div>
                  <div className="fw-bold">Relatório Trimestral</div>
                  <small className="text-muted">Disponível em 5 dias</small>
                </div>
              </div>
              <div className="d-flex align-items-center p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                <MessageCircle size={20} className="me-3" style={{ color: '#FF6B35' }} />
                <div>
                  <div className="fw-bold">Contatos Pendentes</div>
                  <small className="text-muted">3 interessados aguardam resposta</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// Minhas Propriedades reformulado - Layout horizontal
const PropriedadesContent = () => (
  <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 style={{ color: '#001A47', fontWeight: 'bold' }}>Minhas Propriedades</h2>
      <Badge bg="info" style={{ fontSize: '14px', padding: '8px 15px' }}>
        3 Salas Comerciais
      </Badge>
    </div>

    <Row>
      {[1, 2, 3].map((item) => (
        <Col lg={6} key={item} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              <Row className="g-0">
                <Col md={5}>
                  <img 
                    src={`/src/img/salas/sala${item}.png`}
                    alt={`Sala ${item}`}
                    style={{ 
                      width: '100%', 
                      height: '200px', 
                      objectFit: 'cover',
                      borderRadius: '8px 0 0 8px'
                    }}
                  />
                </Col>
                <Col md={7}>
                  <div className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="mb-1" style={{ color: '#001A47', fontWeight: 'bold' }}>
                        Sala {1000 + item * 8} - {10 + item}° Andar
                      </h6>
                      <Badge bg="success" size="sm">Ativo</Badge>
                    </div>
                    
                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-1">
                        <Package size={16} className="me-2 text-muted" />
                        <span className="small text-muted">{66 + item * 6}.{item}6 m²</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="small text-muted">Valor de Compra</div>
                      <div className="fw-bold" style={{ color: '#001A47' }}>
                        R$ {(990900 + item * 50000).toLocaleString('pt-BR')}
                      </div>
                      <div className="small text-success">
                        Valor Atual: R$ {(1200000 + item * 80000).toLocaleString('pt-BR')}
                      </div>
                      <div className="small" style={{ color: '#FF6B35' }}>
                        +{(15 + item * 2).toFixed(1)}% de valorização
                      </div>
                    </div>

                    <div className="d-flex gap-2 flex-wrap">
                      <Button 
                        size="sm" 
                        style={{ 
                          backgroundColor: '#FF6B35', 
                          border: 'none', 
                          borderRadius: '20px',
                          boxShadow: '0 2px 4px rgba(255,107,53,0.2)'
                        }}
                        className="px-3"
                      >
                        <Eye size={14} className="me-1" />
                        Revender
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline-secondary"
                        style={{ 
                          borderRadius: '20px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                        className="px-3"
                      >
                        <FileText size={14} className="me-1" />
                        Docs
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    
    <div className="mt-5">
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <h5 className="mb-4" style={{ color: '#001A47' }}>Status da Construção</h5>
          <Row className="align-items-center">
            <Col md={8}>
              <div className="d-flex align-items-center">
                <div 
                  style={{ 
                    width: '100%', 
                    height: '20px', 
                    backgroundColor: '#e9ecef', 
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}
                >
                  <div 
                    style={{ 
                      width: '75%', 
                      height: '100%', 
                      background: 'linear-gradient(90deg, #FF6B35 0%, #FF8A65 100%)' 
                    }}
                  ></div>
                </div>
                <span className="ms-3 fw-bold" style={{ color: '#001A47', fontSize: '18px' }}>
                  75%
                </span>
              </div>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <div className="small text-muted">Previsão de entrega</div>
              <div className="fw-bold" style={{ color: '#FF6B35' }}>Dezembro 2024</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  </div>
);

// Nova tela - Vitrine de Revenda
const VitrineContent = () => {
  const salasRevenda = [
    {
      id: 1,
      sala: 'Sala 1205 - 12° Andar',
      area: '78.2 m²',
      precoOriginal: 1200000,
      precoRevenda: 1350000,
      vendedor: 'João Silva',
      telefone: '(11) 99999-9999',
      email: 'joao@email.com',
      imagem: '/src/img/salas/sala1.png',
      descricao: 'Sala com vista panorâmica, totalmente equipada.',
      dataAnuncio: '2024-01-15'
    },
    {
      id: 2,
      sala: 'Sala 1108 - 11° Andar',
      area: '72.5 m²',
      precoOriginal: 1100000,
      precoRevenda: 1280000,
      vendedor: 'Maria Santos',
      telefone: '(11) 88888-8888',
      email: 'maria@email.com',
      imagem: '/src/img/salas/sala2.png',
      descricao: 'Excelente localização, pronta para uso.',
      dataAnuncio: '2024-01-10'
    },
    {
      id: 3,
      sala: 'Sala 1315 - 13° Andar',
      area: '85.0 m²',
      precoOriginal: 1300000,
      precoRevenda: 1480000,
      vendedor: 'Carlos Oliveira',
      telefone: '(11) 77777-7777',
      email: 'carlos@email.com',
      imagem: '/src/img/salas/sala3.png',
      descricao: 'Sala ampla com divisórias modulares.',
      dataAnuncio: '2024-01-12'
    },
    {
      id: 4,
      sala: 'Sala 1420 - 14° Andar',
      area: '68.8 m²',
      precoOriginal: 1050000,
      precoRevenda: 1220000,
      vendedor: 'Ana Costa',
      telefone: '(11) 66666-6666',
      email: 'ana@email.com',
      imagem: '/src/img/salas/sala4.png',
      descricao: 'Ideal para consultórios e escritórios.',
      dataAnuncio: '2024-01-08'
    }
  ];

  const [filtroPreco, setFiltroPreco] = useState('todos');
  const [filtroArea, setFiltroArea] = useState('todos');

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: '#001A47', fontWeight: 'bold' }}>Vitrine de Revenda</h2>
        <Badge bg="warning" style={{ fontSize: '14px', padding: '8px 15px' }}>
          {salasRevenda.length} Salas Disponíveis
        </Badge>
      </div>

      {/* Filtros */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col md={3} className="mb-3 mb-md-0">
              <Form.Label className="small fw-bold text-muted">FAIXA DE PREÇO</Form.Label>
              <Form.Select 
                value={filtroPreco}
                onChange={(e) => setFiltroPreco(e.target.value)}
                style={{ borderRadius: '10px' }}
              >
                <option value="todos">Todas as faixas</option>
                <option value="1000000-1300000">R$ 1M - 1.3M</option>
                <option value="1300000-1500000">R$ 1.3M - 1.5M</option>
              </Form.Select>
            </Col>
            <Col md={3} className="mb-3 mb-md-0">
              <Form.Label className="small fw-bold text-muted">ÁREA</Form.Label>
              <Form.Select 
                value={filtroArea}
                onChange={(e) => setFiltroArea(e.target.value)}
                style={{ borderRadius: '10px' }}
              >
                <option value="todos">Todas as áreas</option>
                <option value="60-75">60-75 m²</option>
                <option value="75-90">75-90 m²</option>
              </Form.Select>
            </Col>
            <Col md={3} className="mb-3 mb-md-0">
              <Form.Label className="small fw-bold text-muted">ORDENAR POR</Form.Label>
              <Form.Select style={{ borderRadius: '10px' }}>
                <option>Menor preço</option>
                <option>Maior preço</option>
                <option>Maior área</option>
                <option>Mais recente</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Label className="small fw-bold text-muted">&nbsp;</Form.Label>
              <Button 
                className="w-100 d-block"
                variant="outline-primary" 
                style={{ 
                  borderColor: '#FF6B35', 
                  color: '#FF6B35',
                  borderRadius: '10px'
                }}
              >
                Filtrar
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Grid de Salas */}
      <Row>
        {salasRevenda.map((sala) => {
          const valorizacao = ((sala.precoRevenda - sala.precoOriginal) / sala.precoOriginal * 100).toFixed(1);
          
          return (
            <Col lg={6} key={sala.id} className="mb-4">
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-0">
                  <Row className="g-0">
                    <Col md={5}>
                      <div className="position-relative">
                        <img 
                          src={sala.imagem}
                          alt={sala.sala}
                          style={{ 
                            width: '100%', 
                            height: '250px', 
                            objectFit: 'cover',
                            borderRadius: '8px 0 0 8px'
                          }}
                        />
                        <Badge 
                          style={{ 
                            position: 'absolute',
                            top: '15px',
                            left: '15px',
                            backgroundColor: '#FF6B35',
                            fontSize: '12px',
                            padding: '6px 10px'
                          }}
                        >
                          +{valorizacao}%
                        </Badge>
                      </div>
                    </Col>
                    <Col md={7}>
                      <div className="p-4 h-100 d-flex flex-column">
                        <div className="flex-grow-1">
                          <h6 className="mb-2" style={{ color: '#001A47', fontWeight: 'bold' }}>
                            {sala.sala}
                          </h6>
                          
                          <div className="mb-3">
                            <div className="d-flex align-items-center mb-1">
                              <Package size={16} className="me-2 text-muted" />
                              <span className="small text-muted">{sala.area}</span>
                            </div>
                            <div className="small text-muted mb-2">{sala.descricao}</div>
                          </div>

                          <div className="mb-3">
                            <div className="small text-muted">Preço Original</div>
                            <div className="small text-decoration-line-through">
                              R$ {sala.precoOriginal.toLocaleString('pt-BR')}
                            </div>
                            <div className="fw-bold h5 mb-1" style={{ color: '#FF6B35' }}>
                              R$ {sala.precoRevenda.toLocaleString('pt-BR')}
                            </div>
                          </div>

                          <div className="mb-3 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                            <div className="small fw-bold mb-1">Vendedor</div>
                            <div className="small">{sala.vendedor}</div>
                            <div className="d-flex align-items-center mt-2">
                              <Phone size={14} className="me-2 text-muted" />
                              <span className="small">{sala.telefone}</span>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex gap-2">
                          <Button 
                            size="sm" 
                            style={{ 
                              backgroundColor: '#FF6B35', 
                              border: 'none', 
                              borderRadius: '20px',
                              boxShadow: '0 2px 4px rgba(255,107,53,0.2)'
                            }}
                            className="flex-grow-1"
                          >
                            <Phone size={14} className="me-1" />
                            Contatar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline-secondary"
                            style={{ 
                              borderRadius: '20px',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                          >
                            <Eye size={14} />
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Estatísticas da vitrine */}
      <Card className="border-0 shadow-sm mt-4">
        <Card.Body>
          <h5 className="mb-4" style={{ color: '#001A47' }}>Análise de Mercado - Revenda</h5>
          <Row className="text-center">
            <Col md={3} className="mb-3">
              <h4 style={{ color: '#FF6B35' }}>R$ 1.332.500</h4>
              <div className="small text-muted">Preço Médio</div>
            </Col>
            <Col md={3} className="mb-3">
              <h4 style={{ color: '#28a745' }}>+16.2%</h4>
              <div className="small text-muted">Valorização Média</div>
            </Col>
            <Col md={3} className="mb-3">
              <h4 style={{ color: '#1976d2' }}>76.1 m²</h4>
              <div className="small text-muted">Área Média</div>
            </Col>
            <Col md={3} className="mb-3">
              <h4 style={{ color: '#f57c00' }}>4</h4>
              <div className="small text-muted">Disponíveis</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

// Componentes removidos: ConstrucaoContent e MercadoContent

const MensagensContent = () => (
  <div>
    <h2 className="mb-4" style={{ color: '#001A47' }}>Mensagens</h2>
    <Card className="border-0 shadow-sm">
      <Card.Body className="text-center py-5">
        <MessageCircle size={48} className="text-muted mb-3" />
        <h5 className="text-muted">Nenhuma nova mensagem</h5>
        <p className="text-muted">Suas conversas com interessados aparecerão aqui.</p>
        <Button 
          variant="outline-primary"
          style={{ 
            borderColor: '#FF6B35', 
            color: '#FF6B35',
            boxShadow: '0 2px 4px rgba(255,107,53,0.2)'
          }}
        >
          Compor Mensagem
        </Button>
      </Card.Body>
    </Card>
  </div>
);

const DocumentosContent = () => (
  <div>
    <h2 className="mb-4" style={{ color: '#001A47' }}>Documentos</h2>
    <Row>
      <Col md={6} className="mb-4">
        <Card className="border-0 shadow-sm">
          <Card.Body className="text-center">
            <div className="mb-3">
              <h4 style={{ color: '#001A47' }}>DOCUMENTOS</h4>
            </div>
            <Button 
              size="lg"
              style={{ 
                backgroundColor: '#FF6B35', 
                border: 'none',
                borderRadius: '10px',
                padding: '15px 30px',
                boxShadow: '0 2px 4px rgba(255,107,53,0.2)'
              }}
            >
              Baixar Extrato
            </Button>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={6} className="mb-4">
        <Card className="border-0 shadow-sm">
          <Card.Body>
            <h5>Documentos Disponíveis</h5>
            <ul className="list-unstyled">
              <li className="mb-2">📄 Contrato de Compra e Venda</li>
              <li className="mb-2">📊 Relatório de Investimento Q3</li>
              <li className="mb-2">📈 Análise de Valorização</li>
              <li className="mb-2">🏗️ Relatório de Construção</li>
            </ul>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </div>
);

const ConfiguracoesContent = () => (
  <div>
    <h2 className="mb-4" style={{ color: '#001A47' }}>Configurações</h2>
    <Row>
      <Col md={8}>
        <Card className="border-0 shadow-sm">
          <Card.Body>
            <h5 className="mb-4">Informações Pessoais</h5>
            <Form>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Nome Completo</Form.Label>
                    <Form.Control type="text" defaultValue="Gabriel Silva" />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" defaultValue="gabriel@email.com" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>CPF</Form.Label>
                    <Form.Control type="text" defaultValue="123.456.789-00" disabled />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="text" defaultValue="(11) 99999-9999" />
                  </Form.Group>
                </Col>
              </Row>
              <Button 
                style={{ 
                  backgroundColor: '#FF6B35', 
                  border: 'none',
                  boxShadow: '0 2px 4px rgba(255,107,53,0.2)'
                }}
              >
                Salvar Alterações
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </div>
);

export default AreaMembro;
