
import React, { useState } from 'react';
import { Row, Col, Card, Button, Badge, Form, Modal, Table, Tab, Tabs, ProgressBar } from 'react-bootstrap';
import { 
  ShoppingCart,
  Home,
  DollarSign,
  Eye,
  TrendingUp,
  Calendar,
  FileText,
  Download,
  Edit,
  Upload,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  Receipt,
  Camera,
  Target,
  Filter,
  Star,
  MapPin,
  Phone,
  Mail,
  Building
} from 'lucide-react';

const MarketplaceContent = () => {
  const [activeTab, setActiveTab] = useState('vendas');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(null);

  // Dados das unidades para venda/locação
  const unidadesVenda = [
    {
      id: 1,
      numero: '1205',
      torre: 'A',
      andar: '12º',
      area: 38,
      precoVenda: 520000,
      precoM2: 13684,
      visualizacoes: 245,
      fotosExtras: 8,
      status: 'ativo',
      dataPublicacao: '2025-01-10',
      foto: '/placeholder-image.png',
      propostas: 3,
      favoritos: 12
    },
    {
      id: 2,
      numero: '1506',
      torre: 'B',
      andar: '15º',
      area: 42,
      precoVenda: 580000,
      precoM2: 13809,
      visualizacoes: 189,
      fotosExtras: 12,
      status: 'ativo',
      dataPublicacao: '2025-01-08',
      foto: '/placeholder-image.png',
      propostas: 1,
      favoritos: 8
    }
  ];

  const unidadesLocacao = [
    {
      id: 1,
      numero: '1205',
      torre: 'A',
      andar: '12º',
      area: 38,
      valorAluguel: 5500,
      periodoMinimo: 12,
      inquilino: 'João Santos',
      situacaoContratual: 'ativo',
      contratoInicio: '2024-08-15',
      contratoFim: '2025-08-15',
      ultimoPagamento: '2025-01-05',
      foto: '/placeholder-image.png',
      rating: 4.8,
      atrasos: 0
    },
    {
      id: 2,
      numero: '908',
      torre: 'A',
      andar: '9º',
      area: 35,
      valorAluguel: 4800,
      periodoMinimo: 12,
      situacaoContratual: 'disponivel',
      foto: '/placeholder-image.png'
    }
  ];

  // Propostas simuladas
  const propostas = [
    {
      id: 1,
      unidade: '1205',
      valor: 495000,
      entrada: 100000,
      parcelamento: '24x',
      status: 'negociacao',
      cliente: 'Maria Silva',
      telefone: '(11) 99999-9999',
      email: 'maria@email.com',
      dataRecebimento: '2025-01-12',
      observacoes: 'Cliente interessado em visita presencial',
      valorOriginal: 520000,
      desconto: 25000
    },
    {
      id: 2,
      unidade: '1506',
      valor: 570000,
      entrada: 150000,
      parcelamento: '36x',
      status: 'recebida',
      cliente: 'Carlos Oliveira',
      telefone: '(11) 88888-8888',
      email: 'carlos@email.com',
      dataRecebimento: '2025-01-15',
      observacoes: 'Proposta enviada pelo corretor',
      valorOriginal: 580000,
      desconto: 10000
    },
    {
      id: 3,
      unidade: '1205',
      valor: 510000,
      entrada: 80000,
      parcelamento: '30x',
      status: 'aceita',
      cliente: 'Ana Costa',
      telefone: '(11) 77777-7777',
      email: 'ana@email.com',
      dataRecebimento: '2025-01-10',
      observacoes: 'Proposta aceita, aguardando documentação',
      valorOriginal: 520000,
      desconto: 10000
    }
  ];

  // Status do empreendimento
  const statusEmpreendimento = {
    disponivel: 32,
    vendida: 45,
    reservada: 8,
    totalUnidades: 85,
    valorMedioVenda: 1450000,
    tempoMedioVenda: 45, // dias
    valorMedioAluguel: 5200
  };

  const openModal = (unit, type) => {
    setSelectedUnit(unit);
    setModalType(type);
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    const badges = {
      ativo: { bg: 'success', text: 'Ativo' },
      inativo: { bg: 'secondary', text: 'Inativo' },
      vendido: { bg: 'danger', text: 'Vendido' },
      recebida: { bg: 'primary', text: 'Recebida' },
      negociacao: { bg: 'warning', text: 'Em Negociação' },
      aceita: { bg: 'success', text: 'Aceita' },
      recusada: { bg: 'danger', text: 'Recusada' },
      disponivel: { bg: 'success', text: 'Disponível' }
    };
    return badges[status] || { bg: 'secondary', text: 'Status' };
  };

  const renderVendasTab = () => (
    <div>
      {/* Analytics de Vendas */}
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '20px' }}>
            <Card.Body className="p-4 text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                  boxShadow: '0 8px 25px rgba(245,158,11,0.3)'
                }}
              >
                <Building size={28} className="text-white" />
              </div>
              <h4 style={{ color: '#0f172a', fontWeight: '800', fontSize: '24px' }}>
                {statusEmpreendimento.disponivel}
              </h4>
              <p style={{ color: '#64748b', fontWeight: '600', fontSize: '12px' }}>
                Unidades Disponíveis
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '20px' }}>
            <Card.Body className="p-4 text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  boxShadow: '0 8px 25px rgba(16,185,129,0.3)'
                }}
              >
                <DollarSign size={28} className="text-white" />
              </div>
              <h4 style={{ color: '#0f172a', fontWeight: '800', fontSize: '20px' }}>
                R$ {(statusEmpreendimento.valorMedioVenda / 1000000).toFixed(1)}M
              </h4>
              <p style={{ color: '#64748b', fontWeight: '600', fontSize: '12px' }}>
                Valor Médio de Venda
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '20px' }}>
            <Card.Body className="p-4 text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  boxShadow: '0 8px 25px rgba(59,130,246,0.3)'
                }}
              >
                <Clock size={28} className="text-white" />
              </div>
              <h4 style={{ color: '#0f172a', fontWeight: '800', fontSize: '24px' }}>
                {statusEmpreendimento.tempoMedioVenda}
              </h4>
              <p style={{ color: '#64748b', fontWeight: '600', fontSize: '12px' }}>
                Dias Médio de Venda
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '20px' }}>
            <Card.Body className="p-4 text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  boxShadow: '0 8px 25px rgba(139,92,246,0.3)'
                }}
              >
                <TrendingUp size={28} className="text-white" />
              </div>
              <h4 style={{ color: '#0f172a', fontWeight: '800', fontSize: '24px' }}>
                {Math.round((statusEmpreendimento.vendida/statusEmpreendimento.totalUnidades)*100)}%
              </h4>
              <p style={{ color: '#64748b', fontWeight: '600', fontSize: '12px' }}>
                Taxa de Conversão
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Minhas Unidades à Venda */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 style={{ color: '#0f172a', fontWeight: '700' }}>Minhas Unidades à Venda</h5>
        <Button 
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
            border: 'none',
            borderRadius: '16px',
            fontWeight: '700',
            padding: '10px 20px'
          }}
          onClick={() => openModal(null, 'nova-venda')}
        >
          <Plus size={16} className="me-2" />
          Publicar Nova Unidade
        </Button>
      </div>

      <Row>
        {unidadesVenda.map(unidade => (
          <Col lg={6} className="mb-4" key={unidade.id}>
            <Card className="border-0 shadow-lg" style={{ borderRadius: '24px' }}>
              <Card.Body className="p-4">
                <Row>
                  <Col md={4} className="mb-3">
                    <div 
                      style={{
                        backgroundImage: `url(${unidade.foto})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '120px',
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        position: 'relative'
                      }}
                    >
                      <div 
                        className="position-absolute top-0 end-0 m-2 px-2 py-1"
                        style={{
                          background: 'rgba(0,0,0,0.7)',
                          borderRadius: '8px',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        <Camera size={12} className="me-1" />
                        +{unidade.fotosExtras}
                      </div>
                    </div>
                  </Col>
                  <Col md={8}>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 style={{ color: '#0f172a', fontWeight: '700' }}>
                        Sala {unidade.numero}
                      </h5>
                      <Badge bg={getStatusBadge(unidade.status).bg}>
                        {getStatusBadge(unidade.status).text}
                      </Badge>
                    </div>
                    
                    <div className="mb-3" style={{ fontSize: '14px' }}>
                      <div className="d-flex justify-content-between mb-1">
                        <span style={{ color: '#64748b', fontWeight: '500' }}>Torre/Andar:</span>
                        <span style={{ fontWeight: '700', color: '#0f172a' }}>Torre {unidade.torre} - {unidade.andar}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span style={{ color: '#64748b', fontWeight: '500' }}>Área:</span>
                        <span style={{ fontWeight: '700', color: '#0f172a' }}>{unidade.area} m²</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span style={{ color: '#64748b', fontWeight: '500' }}>Preço:</span>
                        <span style={{ fontWeight: '700', color: '#0f172a' }}>R$ {unidade.precoVenda.toLocaleString('pt-BR')}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span style={{ color: '#64748b', fontWeight: '500' }}>Preço/m²:</span>
                        <span style={{ fontWeight: '700', color: '#0f172a' }}>R$ {unidade.precoM2.toLocaleString('pt-BR')}</span>
                      </div>
                    </div>

                    {/* Métricas de Performance */}
                    <div className="mb-3 p-3" style={{ background: '#f8fafc', borderRadius: '12px' }}>
                      <Row className="text-center">
                        <Col md={4}>
                          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                            <Eye size={12} className="me-1" />
                            Visualizações
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
                            {unidade.visualizacoes}
                          </div>
                        </Col>
                        <Col md={4}>
                          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                            <FileText size={12} className="me-1" />
                            Propostas
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
                            {unidade.propostas}
                          </div>
                        </Col>
                        <Col md={4}>
                          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                            <Star size={12} className="me-1" />
                            Favoritos
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
                            {unidade.favoritos}
                          </div>
                        </Col>
                      </Row>
                    </div>

                    {/* Ações */}
                    <div className="d-flex flex-wrap gap-2">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        style={{ borderRadius: '12px', fontWeight: '600' }}
                        onClick={() => openModal(unidade, 'editar-preco')}
                      >
                        <Edit size={14} className="me-1" />
                        Editar Preço
                      </Button>
                      <Button 
                        variant="outline-success" 
                        size="sm"
                        style={{ borderRadius: '12px', fontWeight: '600' }}
                        onClick={() => openModal(unidade, 'fotos')}
                      >
                        <Upload size={14} className="me-1" />
                        Gerenciar Fotos
                      </Button>
                      <Button 
                        variant="outline-info" 
                        size="sm"
                        style={{ borderRadius: '12px', fontWeight: '600' }}
                        onClick={() => openModal(unidade, 'propostas')}
                      >
                        <FileText size={14} className="me-1" />
                        Ver Propostas ({unidade.propostas})
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Histórico de Propostas */}
      <Card className="border-0 shadow-lg mt-5" style={{ borderRadius: '24px' }}>
        <Card.Body className="p-4">
          <h5 style={{ color: '#0f172a', fontWeight: '700' }} className="mb-4">
            Gestão de Propostas Recebidas
          </h5>
          <Table responsive className="border-0">
            <thead style={{ background: '#f8fafc' }}>
              <tr>
                <th style={{ border: 'none', fontWeight: '700', color: '#0f172a' }}>Unidade</th>
                <th style={{ border: 'none', fontWeight: '700', color: '#0f172a' }}>Cliente</th>
                <th style={{ border: 'none', fontWeight: '700', color: '#0f172a' }}>Contato</th>
                <th style={{ border: 'none', fontWeight: '700', color: '#0f172a' }}>Proposta</th>
                <th style={{ border: 'none', fontWeight: '700', color: '#0f172a' }}>Desconto</th>
                <th style={{ border: 'none', fontWeight: '700', color: '#0f172a' }}>Status</th>
                <th style={{ border: 'none', fontWeight: '700', color: '#0f172a' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {propostas.map(proposta => (
                <tr key={proposta.id}>
                  <td style={{ border: 'none', fontWeight: '600' }}>
                    Sala {proposta.unidade}
                  </td>
                  <td style={{ border: 'none', fontWeight: '600' }}>
                    {proposta.cliente}
                  </td>
                  <td style={{ border: 'none', fontSize: '12px' }}>
                    <div><Phone size={12} className="me-1" />{proposta.telefone}</div>
                    <div><Mail size={12} className="me-1" />{proposta.email}</div>
                  </td>
                  <td style={{ border: 'none', fontWeight: '600' }}>
                    <div>R$ {proposta.valor.toLocaleString('pt-BR')}</div>
                    <small style={{ color: '#64748b' }}>Entrada: R$ {proposta.entrada.toLocaleString('pt-BR')}</small>
                  </td>
                  <td style={{ border: 'none' }}>
                    <Badge bg={proposta.desconto > 20000 ? 'warning' : 'success'}>
                      R$ {proposta.desconto.toLocaleString('pt-BR')}
                    </Badge>
                  </td>
                  <td style={{ border: 'none' }}>
                    <Badge bg={getStatusBadge(proposta.status).bg}>
                      {getStatusBadge(proposta.status).text}
                    </Badge>
                  </td>
                  <td style={{ border: 'none' }}>
                    <div className="d-flex gap-1">
                      {proposta.status === 'recebida' && (
                        <>
                          <Button 
                            variant="outline-success" 
                            size="sm"
                            onClick={() => openModal(proposta, 'aceitar-proposta')}
                          >
                            <CheckCircle size={14} />
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => openModal(proposta, 'recusar-proposta')}
                          >
                            <XCircle size={14} />
                          </Button>
                        </>
                      )}
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => openModal(proposta, 'detalhes-proposta')}
                      >
                        <Eye size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );

  const renderLocacoesTab = () => (
    <div>
      {/* Analytics de Locação */}
      <Row className="mb-4">
        <Col lg={4} md={6} className="mb-3">
          <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '20px' }}>
            <Card.Body className="p-4 text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  boxShadow: '0 8px 25px rgba(59,130,246,0.3)'
                }}
              >
                <Home size={28} className="text-white" />
              </div>
              <h4 style={{ color: '#0f172a', fontWeight: '800', fontSize: '24px' }}>
                {unidadesLocacao.filter(u => u.situacaoContratual === 'ativo').length}
              </h4>
              <p style={{ color: '#64748b', fontWeight: '600', fontSize: '12px' }}>
                Unidades Locadas
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} md={6} className="mb-3">
          <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '20px' }}>
            <Card.Body className="p-4 text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  boxShadow: '0 8px 25px rgba(16,185,129,0.3)'
                }}
              >
                <DollarSign size={28} className="text-white" />
              </div>
              <h4 style={{ color: '#0f172a', fontWeight: '800', fontSize: '20px' }}>
                R$ {statusEmpreendimento.valorMedioAluguel.toLocaleString('pt-BR')}
              </h4>
              <p style={{ color: '#64748b', fontWeight: '600', fontSize: '12px' }}>
                Aluguel Médio
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} md={6} className="mb-3">
          <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '20px' }}>
            <Card.Body className="p-4 text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                  boxShadow: '0 8px 25px rgba(245,158,11,0.3)'
                }}
              >
                <Star size={28} className="text-white" />
              </div>
              <h4 style={{ color: '#0f172a', fontWeight: '800', fontSize: '24px' }}>
                98%
              </h4>
              <p style={{ color: '#64748b', fontWeight: '600', fontSize: '12px' }}>
                Taxa de Ocupação
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 style={{ color: '#0f172a', fontWeight: '700' }}>Gestão de Locações</h5>
        <Button 
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            border: 'none',
            borderRadius: '16px',
            fontWeight: '700',
            padding: '10px 20px'
          }}
          onClick={() => openModal(null, 'nova-locacao')}
        >
          <Plus size={16} className="me-2" />
          Colocar para Locação
        </Button>
      </div>

      <Row>
        {unidadesLocacao.map(unidade => (
          <Col lg={12} className="mb-4" key={unidade.id}>
            <Card className="border-0 shadow-lg" style={{ borderRadius: '24px' }}>
              <Card.Body className="p-4">
                <Row>
                  <Col md={2} className="mb-3">
                    <div 
                      style={{
                        backgroundImage: `url(${unidade.foto})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '120px',
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0'
                      }}
                    />
                  </Col>
                  <Col md={10}>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 style={{ color: '#0f172a', fontWeight: '700' }}>
                        Sala {unidade.numero} - Torre {unidade.torre}
                      </h5>
                      <Badge bg={getStatusBadge(unidade.situacaoContratual).bg}>
                        {unidade.situacaoContratual === 'ativo' ? 'Locada' : 'Disponível'}
                      </Badge>
                    </div>

                    <Row>
                      <Col md={6}>
                        <div style={{ fontSize: '14px' }} className="mb-3">
                          <div className="d-flex justify-content-between mb-1">
                            <span style={{ color: '#64748b', fontWeight: '500' }}>Valor do Aluguel:</span>
                            <span style={{ fontWeight: '700', color: '#10b981' }}>R$ {unidade.valorAluguel.toLocaleString('pt-BR')}/mês</span>
                          </div>
                          <div className="d-flex justify-content-between mb-1">
                            <span style={{ color: '#64748b', fontWeight: '500' }}>Área:</span>
                            <span style={{ fontWeight: '700', color: '#0f172a' }}>{unidade.area} m²</span>
                          </div>
                          {unidade.inquilino && (
                            <>
                              <div className="d-flex justify-content-between mb-1">
                                <span style={{ color: '#64748b', fontWeight: '500' }}>Inquilino:</span>
                                <span style={{ fontWeight: '700', color: '#0f172a' }}>{unidade.inquilino}</span>
                              </div>
                              <div className="d-flex justify-content-between mb-1">
                                <span style={{ color: '#64748b', fontWeight: '500' }}>Rating Inquilino:</span>
                                <div className="d-flex align-items-center">
                                  <Star size={14} style={{ color: '#f59e0b' }} className="me-1" />
                                  <span style={{ fontWeight: '700', color: '#0f172a' }}>{unidade.rating}</span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </Col>
                      <Col md={6}>
                        {unidade.inquilino && (
                          <div style={{ fontSize: '14px' }} className="mb-3">
                            <div className="d-flex justify-content-between mb-1">
                              <span style={{ color: '#64748b', fontWeight: '500' }}>Início do Contrato:</span>
                              <span style={{ fontWeight: '700', color: '#0f172a' }}>{new Date(unidade.contratoInicio).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-1">
                              <span style={{ color: '#64748b', fontWeight: '500' }}>Vencimento:</span>
                              <span style={{ fontWeight: '700', color: '#0f172a' }}>{new Date(unidade.contratoFim).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-1">
                              <span style={{ color: '#64748b', fontWeight: '500' }}>Último Pagamento:</span>
                              <span style={{ fontWeight: '700', color: '#10b981' }}>{new Date(unidade.ultimoPagamento).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span style={{ color: '#64748b', fontWeight: '500' }}>Atrasos:</span>
                              <Badge bg={unidade.atrasos === 0 ? 'success' : 'danger'}>
                                {unidade.atrasos} atrasos
                              </Badge>
                            </div>
                          </div>
                        )}
                      </Col>
                    </Row>

                    {/* Progress bar para contratos próximos do vencimento */}
                    {unidade.contratoFim && (
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                            Tempo restante do contrato
                          </span>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>
                            {Math.floor((new Date(unidade.contratoFim) - new Date()) / (1000 * 60 * 60 * 24))} dias
                          </span>
                        </div>
                        <ProgressBar 
                          now={75} 
                          style={{ height: '8px', borderRadius: '4px' }}
                          variant={75 > 50 ? 'success' : 75 > 25 ? 'warning' : 'danger'}
                        />
                      </div>
                    )}

                    {/* Ações */}
                    <div className="d-flex flex-wrap gap-2">
                      {unidade.inquilino ? (
                        <>
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            style={{ borderRadius: '12px', fontWeight: '600' }}
                            onClick={() => openModal(unidade, 'contrato')}
                          >
                            <FileText size={14} className="me-1" />
                            Ver Contrato
                          </Button>
                          <Button 
                            variant="outline-success" 
                            size="sm"
                            style={{ borderRadius: '12px', fontWeight: '600' }}
                            onClick={() => openModal(unidade, 'pagamentos')}
                          >
                            <Receipt size={14} className="me-1" />
                            Histórico Pagamentos
                          </Button>
                          <Button 
                            variant="outline-info" 
                            size="sm"
                            style={{ borderRadius: '12px', fontWeight: '600' }}
                            onClick={() => openModal(unidade, 'inquilino')}
                          >
                            <Users size={14} className="me-1" />
                            Dados do Inquilino
                          </Button>
                        </>
                      ) : (
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          style={{ borderRadius: '12px', fontWeight: '600' }}
                          onClick={() => openModal(unidade, 'publicar-locacao')}
                        >
                          <Plus size={14} className="me-1" />
                          Publicar para Locação
                        </Button>
                      )}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );

  return (
    <div>
      <h2 style={{ color: '#0f172a', fontWeight: '800', fontSize: '32px' }} className="mb-4">
        Vendas e Locações
      </h2>
      <p className="text-muted mb-5" style={{ fontSize: '16px', fontWeight: '500' }}>
        Gerencie suas vendas e locações com controle total de propostas e contratos
      </p>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
        style={{ borderBottom: '2px solid #e2e8f0' }}
      >
        <Tab 
          eventKey="vendas" 
          title={
            <div className="d-flex align-items-center">
              <ShoppingCart size={16} className="me-2" />
              Gestão de Vendas
            </div>
          }
        >
          {renderVendasTab()}
        </Tab>
        <Tab 
          eventKey="locacoes" 
          title={
            <div className="d-flex align-items-center">
              <Home size={16} className="me-2" />
              Gestão de Locações
            </div>
          }
        >
          {renderLocacoesTab()}
        </Tab>
      </Tabs>

      {/* Modal para ações */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton style={{ borderBottom: 'none', paddingBottom: '0' }}>
          <Modal.Title style={{ color: '#0f172a', fontWeight: '700' }}>
            {modalType === 'editar-preco' && 'Editar Preço de Venda'}
            {modalType === 'fotos' && 'Gerenciar Fotos'}
            {modalType === 'propostas' && 'Propostas Recebidas'}
            {modalType === 'nova-venda' && 'Publicar Unidade à Venda'}
            {modalType === 'nova-locacao' && 'Colocar para Locação'}
            {modalType === 'aceitar-proposta' && 'Aceitar Proposta'}
            {modalType === 'recusar-proposta' && 'Recusar Proposta'}
            {modalType === 'detalhes-proposta' && 'Detalhes da Proposta'}
            {modalType === 'contrato' && 'Contrato de Locação'}
            {modalType === 'pagamentos' && 'Histórico de Pagamentos'}
            {modalType === 'inquilino' && 'Dados do Inquilino'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '20px 30px' }}>
          {/* Conteúdo específico de cada modal será renderizado aqui */}
          {modalType === 'editar-preco' && selectedUnit && (
            <Form>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label style={{ fontWeight: '600', color: '#374151' }}>Novo Preço</Form.Label>
                    <Form.Control 
                      type="text" 
                      defaultValue={`R$ ${selectedUnit.precoVenda?.toLocaleString('pt-BR')}`}
                      style={{ borderRadius: '12px', border: '2px solid #e5e7eb', padding: '12px 16px' }} 
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label style={{ fontWeight: '600', color: '#374151' }}>Preço por m²</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={`R$ ${selectedUnit.precoM2?.toLocaleString('pt-BR')}`}
                      disabled
                      style={{ borderRadius: '12px', border: '2px solid #e5e7eb', padding: '12px 16px' }} 
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          )}

          {modalType === 'detalhes-proposta' && selectedUnit && (
            <div>
              <Row className="mb-4">
                <Col md={6}>
                  <h6 style={{ color: '#0f172a', fontWeight: '700' }}>Dados do Cliente</h6>
                  <p><strong>Nome:</strong> {selectedUnit.cliente}</p>
                  <p><strong>Telefone:</strong> {selectedUnit.telefone}</p>
                  <p><strong>Email:</strong> {selectedUnit.email}</p>
                </Col>
                <Col md={6}>
                  <h6 style={{ color: '#0f172a', fontWeight: '700' }}>Detalhes da Proposta</h6>
                  <p><strong>Valor Original:</strong> R$ {selectedUnit.valorOriginal?.toLocaleString('pt-BR')}</p>
                  <p><strong>Proposta:</strong> R$ {selectedUnit.valor?.toLocaleString('pt-BR')}</p>
                  <p><strong>Desconto:</strong> R$ {selectedUnit.desconto?.toLocaleString('pt-BR')}</p>
                  <p><strong>Entrada:</strong> R$ {selectedUnit.entrada?.toLocaleString('pt-BR')}</p>
                </Col>
              </Row>
              <div className="p-3" style={{ background: '#f8fafc', borderRadius: '12px' }}>
                <h6 style={{ color: '#0f172a', fontWeight: '700' }}>Observações</h6>
                <p style={{ margin: '0' }}>{selectedUnit.observacoes}</p>
              </div>
            </div>
          )}

          {modalType === 'fotos' && (
            <div>
              <div style={{ 
                border: '2px dashed #e5e7eb', 
                borderRadius: '12px', 
                padding: '40px', 
                textAlign: 'center',
                cursor: 'pointer'
              }}>
                <Upload size={32} style={{ color: '#9ca3af' }} className="mb-2" />
                <p style={{ color: '#9ca3af', margin: '0' }}>Clique para adicionar fotos extras</p>
              </div>
            </div>
          )}

          {modalType === 'pagamentos' && (
            <Table responsive striped className="border-0">
              <thead style={{ background: '#f8fafc' }}>
                <tr>
                  <th style={{ border: 'none', fontWeight: '700', color: '#0f172a' }}>Mês/Ano</th>
                  <th style={{ border: 'none', fontWeight: '700', color: '#0f172a' }}>Valor</th>
                  <th style={{ border: 'none', fontWeight: '700', color: '#0f172a' }}>Status</th>
                  <th style={{ border: 'none', fontWeight: '700', color: '#0f172a' }}>Data Pagamento</th>
                  <th style={{ border: 'none', fontWeight: '700', color: '#0f172a' }}>Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: 'none', fontWeight: '600' }}>Jan/2025</td>
                  <td style={{ border: 'none', fontWeight: '600' }}>R$ 5.500,00</td>
                  <td style={{ border: 'none' }}>
                    <Badge bg="success">Pago</Badge>
                  </td>
                  <td style={{ border: 'none' }}>05/01/2025</td>
                  <td style={{ border: 'none' }}>
                    <Button variant="outline-primary" size="sm">
                      <Download size={14} /> Recibo
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          )}

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button 
              variant="outline-secondary"
              onClick={() => setShowModal(false)}
              style={{ borderRadius: '12px', fontWeight: '600' }}
            >
              Cancelar
            </Button>
            <Button 
              variant="primary"
              style={{ borderRadius: '12px', fontWeight: '600' }}
            >
              {modalType === 'aceitar-proposta' && 'Aceitar Proposta'}
              {modalType === 'recusar-proposta' && 'Recusar Proposta'}
              {modalType === 'editar-preco' && 'Salvar Preço'}
              {modalType === 'fotos' && 'Salvar Fotos'}
              {(modalType === 'nova-venda' || modalType === 'nova-locacao') && 'Publicar'}
              {!['aceitar-proposta', 'recusar-proposta', 'editar-preco', 'fotos', 'nova-venda', 'nova-locacao'].includes(modalType) && 'Confirmar'}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MarketplaceContent;
