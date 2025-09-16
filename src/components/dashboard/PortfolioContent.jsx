
import React, { useState } from 'react';
import { Row, Col, Card, Button, Badge, Form, Modal, Table } from 'react-bootstrap';
import { 
  Home, 
  DollarSign, 
  Eye, 
  TrendingUp, 
  MapPin, 
  Calendar,
  Package,
  ShoppingCart,
  Building,
  FileText,
  Download,
  Edit,
  Heart,
  Filter,
  Search,
  BarChart3,
  Target,
  Clock,
  Users,
  Camera,
  Upload
} from 'lucide-react';

const PortfolioContent = () => {
  const [filtroStatus, setFiltroStatus] = useState('todas');
  const [showModal, setShowModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [modalType, setModalType] = useState('');

  // Dados das unidades (simulados)
  const unidades = [
    {
      id: 1,
      numero: '1205',
      torre: 'A',
      andar: '12º',
      area: 38,
      status: 'disponivel',
      precoVenda: 520000,
      aluguelSugerido: 5500,
      investimento: 500000,
      aluguelBruto: 5500,
      taxas: 800,
      aluguelLiquido: 4700,
      roi: 0.94,
      roiAnual: 11.3,
      payback: 7.3,
      precoM2Mercado: 14200,
      visualizacoes: 245,
      foto: '/placeholder-image.png'
    },
    {
      id: 2,
      numero: '1506',
      torre: 'B',
      andar: '15º',
      area: 42,
      status: 'locada',
      precoVenda: 580000,
      aluguelSugerido: 6200,
      investimento: 560000,
      aluguelBruto: 6200,
      taxas: 850,
      aluguelLiquido: 5350,
      roi: 0.96,
      roiAnual: 11.5,
      payback: 7.1,
      precoM2Mercado: 14200,
      visualizacoes: 189,
      foto: '/placeholder-image.png',
      inquilino: 'João Santos',
      contratoVence: '2025-08-15',
      ultimoPagamento: '2025-01-05'
    },
    {
      id: 3,
      numero: '908',
      torre: 'A',
      andar: '9º',
      area: 35,
      status: 'vendida',
      precoVenda: 485000,
      valorVendido: 475000,
      dataVenda: '2024-11-20',
      comprador: 'Maria Silva',
      comissao: 23750,
      foto: '/placeholder-image.png'
    }
  ];

  // KPIs calculados
  const totalSalas = 120;
  const salasVendidas = 81;
  const minhasUnidades = unidades.length;
  const valorMedioM2 = 15000;
  const percentualVendido = ((salasVendidas / totalSalas) * 100).toFixed(1);

  // Filtrar unidades
  const unidadesFiltradas = unidades.filter(unidade => {
    if (filtroStatus === 'todas') return true;
    return unidade.status === filtroStatus;
  });

  const getStatusBadge = (status) => {
    const badges = {
      disponivel: { bg: 'success', text: 'Disponível' },
      vendida: { bg: 'danger', text: 'Vendida' },
      reservada: { bg: 'warning', text: 'Reservada' },
      locada: { bg: 'primary', text: 'Locada' }
    };
    return badges[status] || { bg: 'secondary', text: 'Status' };
  };

  const openModal = (unidade, type) => {
    setSelectedUnit(unidade);
    setModalType(type);
    setShowModal(true);
  };

  const renderAcoes = (unidade) => {
    const baseButtonStyle = {
      borderRadius: '12px',
      fontWeight: '600',
      fontSize: '12px',
      padding: '6px 12px',
      margin: '2px'
    };

    switch (unidade.status) {
      case 'disponivel':
        return (
          <div className="d-flex flex-wrap">
            <Button 
              variant="outline-primary" 
              size="sm" 
              style={baseButtonStyle}
              onClick={() => openModal(unidade, 'reservar')}
            >
              Reservar
            </Button>
            <Button 
              variant="outline-success" 
              size="sm" 
              style={baseButtonStyle}
              onClick={() => openModal(unidade, 'locacao')}
            >
              Colocar para Locação
            </Button>
            <Button 
              variant="outline-warning" 
              size="sm" 
              style={baseButtonStyle}
              onClick={() => openModal(unidade, 'venda')}
            >
              Publicar à Venda
            </Button>
          </div>
        );
      case 'locada':
        return (
          <div className="d-flex flex-wrap">
            <Button 
              variant="outline-primary" 
              size="sm" 
              style={baseButtonStyle}
              onClick={() => openModal(unidade, 'contrato')}
            >
              Ver Contrato
            </Button>
            <Button 
              variant="outline-info" 
              size="sm" 
              style={baseButtonStyle}
              onClick={() => openModal(unidade, 'pagamentos')}
            >
              Histórico Pagamentos
            </Button>
          </div>
        );
      case 'vendida':
        return (
          <Button 
            variant="outline-secondary" 
            size="sm" 
            style={baseButtonStyle}
            onClick={() => openModal(unidade, 'detalhes-venda')}
          >
            Detalhes da Venda
          </Button>
        );
      case 'reservada':
        return (
          <div className="d-flex flex-wrap">
            <Button 
              variant="outline-success" 
              size="sm" 
              style={baseButtonStyle}
              onClick={() => openModal(unidade, 'converter-venda')}
            >
              Converter em Venda
            </Button>
            <Button 
              variant="outline-danger" 
              size="sm" 
              style={baseButtonStyle}
              onClick={() => openModal(unidade, 'cancelar-reserva')}
            >
              Cancelar Reserva
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 style={{ color: '#0f172a', fontWeight: '800', fontSize: '32px' }} className="mb-4">
        Gestão de Unidades
      </h2>
      <p className="text-muted mb-5" style={{ fontSize: '16px', fontWeight: '500' }}>
        Visão consolidada das suas salas/unidades com status claro e ações rápidas
      </p>

      {/* KPIs do Topo */}
      <Row className="mb-5">
        <Col lg={3} md={6} className="mb-4">
          <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '24px' }}>
            <Card.Body className="p-4 text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: '70px',
                  height: '70px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  boxShadow: '0 8px 25px rgba(59,130,246,0.3)'
                }}
              >
                <Building size={32} className="text-white" />
              </div>
              <h3 style={{ color: '#0f172a', fontWeight: '800', fontSize: '28px' }} className="mb-1">
                {totalSalas}
              </h3>
              <p style={{ color: '#64748b', fontWeight: '600', fontSize: '14px' }} className="mb-0">
                Total de Salas
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-4">
          <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '24px' }}>
            <Card.Body className="p-4 text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: '70px',
                  height: '70px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  boxShadow: '0 8px 25px rgba(16,185,129,0.3)'
                }}
              >
                <TrendingUp size={32} className="text-white" />
              </div>
              <h3 style={{ color: '#0f172a', fontWeight: '800', fontSize: '28px' }} className="mb-1">
                {salasVendidas}
              </h3>
              <p style={{ color: '#64748b', fontWeight: '600', fontSize: '14px' }} className="mb-0">
                Salas Vendidas ({percentualVendido}%)
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-4">
          <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '24px' }}>
            <Card.Body className="p-4 text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: '70px',
                  height: '70px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  boxShadow: '0 8px 25px rgba(245,158,11,0.3)'
                }}
              >
                <Heart size={32} className="text-white" />
              </div>
              <h3 style={{ color: '#0f172a', fontWeight: '800', fontSize: '28px' }} className="mb-1">
                {minhasUnidades}
              </h3>
              <p style={{ color: '#64748b', fontWeight: '600', fontSize: '14px' }} className="mb-0">
                Minhas Unidades
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-4">
          <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '24px' }}>
            <Card.Body className="p-4 text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: '70px',
                  height: '70px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  boxShadow: '0 8px 25px rgba(139,92,246,0.3)'
                }}
              >
                <DollarSign size={32} className="text-white" />
              </div>
              <h3 style={{ color: '#0f172a', fontWeight: '800', fontSize: '28px' }} className="mb-1">
                R$ {valorMedioM2.toLocaleString('pt-BR')}
              </h3>
              <p style={{ color: '#64748b', fontWeight: '600', fontSize: '14px' }} className="mb-0">
                Valor Médio m² (à venda)
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filtros */}
      <Card className="border-0 shadow-lg mb-4" style={{ borderRadius: '24px' }}>
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col md={6}>
              <h5 style={{ color: '#0f172a', fontWeight: '700' }} className="mb-3">
                <Filter size={20} className="me-2" />
                Filtros
              </h5>
              <div className="d-flex flex-wrap gap-2">
                {[
                  { value: 'todas', label: 'Todas', count: unidades.length },
                  { value: 'disponivel', label: 'Disponíveis', count: unidades.filter(u => u.status === 'disponivel').length },
                  { value: 'locada', label: 'Locadas', count: unidades.filter(u => u.status === 'locada').length },
                  { value: 'vendida', label: 'Vendidas', count: unidades.filter(u => u.status === 'vendida').length },
                  { value: 'reservada', label: 'Reservadas', count: unidades.filter(u => u.status === 'reservada').length }
                ].map(filtro => (
                  <Button
                    key={filtro.value}
                    variant={filtroStatus === filtro.value ? 'primary' : 'outline-secondary'}
                    size="sm"
                    onClick={() => setFiltroStatus(filtro.value)}
                    style={{
                      borderRadius: '12px',
                      fontWeight: '600',
                      padding: '8px 16px'
                    }}
                  >
                    {filtro.label} ({filtro.count})
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Lista de Unidades */}
      <Row>
        {unidadesFiltradas.map(unidade => (
          <Col lg={6} className="mb-4" key={unidade.id}>
            <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '24px' }}>
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
                        border: '1px solid #e2e8f0'
                      }}
                    />
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
                      
                      {unidade.status === 'disponivel' && (
                        <>
                          <div className="d-flex justify-content-between mb-1">
                            <span style={{ color: '#64748b', fontWeight: '500' }}>Preço sugerido:</span>
                            <span style={{ fontWeight: '700', color: '#0f172a' }}>R$ {unidade.precoVenda.toLocaleString('pt-BR')}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-1">
                            <span style={{ color: '#64748b', fontWeight: '500' }}>Aluguel sugerido:</span>
                            <span style={{ fontWeight: '700', color: '#0f172a' }}>R$ {unidade.aluguelSugerido.toLocaleString('pt-BR')}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span style={{ color: '#64748b', fontWeight: '500' }}>ROI estimado:</span>
                            <span style={{ fontWeight: '700', color: '#10b981' }}>{unidade.roi}% a.m.</span>
                          </div>
                        </>
                      )}

                      {unidade.status === 'locada' && (
                        <>
                          <div className="d-flex justify-content-between mb-1">
                            <span style={{ color: '#64748b', fontWeight: '500' }}>Inquilino:</span>
                            <span style={{ fontWeight: '700', color: '#0f172a' }}>{unidade.inquilino}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-1">
                            <span style={{ color: '#64748b', fontWeight: '500' }}>Contrato vence:</span>
                            <span style={{ fontWeight: '700', color: '#0f172a' }}>{new Date(unidade.contratoVence).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span style={{ color: '#64748b', fontWeight: '500' }}>ROI atual:</span>
                            <span style={{ fontWeight: '700', color: '#10b981' }}>{unidade.roi}% a.m.</span>
                          </div>
                        </>
                      )}

                      {unidade.status === 'vendida' && (
                        <>
                          <div className="d-flex justify-content-between mb-1">
                            <span style={{ color: '#64748b', fontWeight: '500' }}>Valor vendido:</span>
                            <span style={{ fontWeight: '700', color: '#0f172a' }}>R$ {unidade.valorVendido.toLocaleString('pt-BR')}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-1">
                            <span style={{ color: '#64748b', fontWeight: '500' }}>Data da venda:</span>
                            <span style={{ fontWeight: '700', color: '#0f172a' }}>{new Date(unidade.dataVenda).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span style={{ color: '#64748b', fontWeight: '500' }}>Comprador:</span>
                            <span style={{ fontWeight: '700', color: '#0f172a' }}>{unidade.comprador}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* ROI Detalhado para unidades disponíveis/locadas */}
                    {(unidade.status === 'disponivel' || unidade.status === 'locada') && (
                      <div className="mb-3 p-3" style={{ background: '#f8fafc', borderRadius: '12px' }}>
                        <h6 style={{ color: '#0f172a', fontWeight: '700', fontSize: '12px' }} className="mb-2">
                          ANÁLISE ROI
                        </h6>
                        <div style={{ fontSize: '12px' }}>
                          <div className="d-flex justify-content-between mb-1">
                            <span style={{ color: '#64748b' }}>Investimento:</span>
                            <span style={{ fontWeight: '600', color: '#0f172a' }}>R$ {unidade.investimento.toLocaleString('pt-BR')}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-1">
                            <span style={{ color: '#64748b' }}>Aluguel bruto:</span>
                            <span style={{ fontWeight: '600', color: '#0f172a' }}>R$ {unidade.aluguelBruto.toLocaleString('pt-BR')}/mês</span>
                          </div>
                          <div className="d-flex justify-content-between mb-1">
                            <span style={{ color: '#64748b' }}>Taxas/condomínio:</span>
                            <span style={{ fontWeight: '600', color: '#dc2626' }}>- R$ {unidade.taxas.toLocaleString('pt-BR')}/mês</span>
                          </div>
                          <div className="d-flex justify-content-between mb-1">
                            <span style={{ color: '#64748b' }}>Aluguel líquido:</span>
                            <span style={{ fontWeight: '600', color: '#10b981' }}>R$ {unidade.aluguelLiquido.toLocaleString('pt-BR')}/mês</span>
                          </div>
                          <hr style={{ margin: '8px 0' }} />
                          <div className="d-flex justify-content-between mb-1">
                            <span style={{ color: '#0f172a', fontWeight: '700' }}>ROI:</span>
                            <span style={{ fontWeight: '700', color: '#10b981' }}>{unidade.roi}% a.m. ({unidade.roiAnual}% a.a.)</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span style={{ color: '#0f172a', fontWeight: '700' }}>Payback:</span>
                            <span style={{ fontWeight: '700', color: '#0f172a' }}>~ {unidade.payback} anos</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Comparativo de mercado */}
                    {unidade.precoM2Mercado && (
                      <div className="mb-3 p-2" style={{ background: '#eff6ff', borderRadius: '8px', border: '1px solid #dbeafe' }}>
                        <p style={{ fontSize: '12px', color: '#1e40af', fontWeight: '600', margin: '0' }}>
                          <BarChart3 size={14} className="me-1" />
                          Preço/m² do mercado na região: R$ {unidade.precoM2Mercado.toLocaleString('pt-BR')}/m² (fonte interna)
                        </p>
                      </div>
                    )}

                    {/* Visualizações para unidades à venda */}
                    {unidade.visualizacoes && (
                      <div className="mb-3">
                        <small style={{ color: '#64748b', fontWeight: '500' }}>
                          <Eye size={14} className="me-1" />
                          {unidade.visualizacoes} visitas no anúncio
                        </small>
                      </div>
                    )}

                    {/* Ações */}
                    <div className="mt-3">
                      {renderAcoes(unidade)}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal para ações */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton style={{ borderBottom: 'none', paddingBottom: '0' }}>
          <Modal.Title style={{ color: '#0f172a', fontWeight: '700' }}>
            {modalType === 'reservar' && 'Reservar Unidade'}
            {modalType === 'locacao' && 'Colocar para Locação'}
            {modalType === 'venda' && 'Publicar à Venda'}
            {modalType === 'contrato' && 'Ver Contrato'}
            {modalType === 'pagamentos' && 'Histórico de Pagamentos'}
            {modalType === 'detalhes-venda' && 'Detalhes da Venda'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '20px 30px' }}>
          {selectedUnit && (
            <div>
              <div className="text-center mb-4">
                <h5 style={{ color: '#0f172a', fontWeight: '700' }}>
                  Sala {selectedUnit.numero} - Torre {selectedUnit.torre} - {selectedUnit.andar}
                </h5>
                <p style={{ color: '#64748b' }}>{selectedUnit.area} m²</p>
              </div>

              {modalType === 'pagamentos' && selectedUnit.status === 'locada' && (
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
                    <tr>
                      <td style={{ border: 'none', fontWeight: '600' }}>Dez/2024</td>
                      <td style={{ border: 'none', fontWeight: '600' }}>R$ 5.500,00</td>
                      <td style={{ border: 'none' }}>
                        <Badge bg="success">Pago</Badge>
                      </td>
                      <td style={{ border: 'none' }}>03/12/2024</td>
                      <td style={{ border: 'none' }}>
                        <Button variant="outline-primary" size="sm">
                          <Download size={14} /> Recibo
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              )}

              {modalType === 'venda' && (
                <Form>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label style={{ fontWeight: '600', color: '#374151' }}>Preço de Venda</Form.Label>
                        <Form.Control 
                          type="text" 
                          defaultValue={`R$ ${selectedUnit.precoVenda?.toLocaleString('pt-BR')}`}
                          style={{ 
                            borderRadius: '12px',
                            border: '2px solid #e5e7eb',
                            padding: '12px 16px'
                          }} 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label style={{ fontWeight: '600', color: '#374151' }}>Preço por m²</Form.Label>
                        <Form.Control 
                          type="text" 
                          value={`R$ ${Math.round(selectedUnit.precoVenda / selectedUnit.area).toLocaleString('pt-BR')}`}
                          disabled
                          style={{ 
                            borderRadius: '12px',
                            border: '2px solid #e5e7eb',
                            padding: '12px 16px'
                          }} 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: '600', color: '#374151' }}>Fotos Extras</Form.Label>
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
                  </Form.Group>
                </Form>
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
                  {modalType === 'venda' && 'Publicar à Venda'}
                  {modalType === 'locacao' && 'Colocar para Locação'}
                  {modalType === 'reservar' && 'Confirmar Reserva'}
                  {modalType === 'contrato' && 'Baixar Contrato'}
                  {modalType === 'detalhes-venda' && 'Ver Detalhes'}
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PortfolioContent;
