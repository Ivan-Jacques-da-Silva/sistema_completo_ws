
import React, { useState } from 'react';
import { Card, Row, Col, Button, Badge, ProgressBar } from 'react-bootstrap';
import { 
  DollarSign, 
  Home, 
  Upload, 
  Eye, 
  FileText, 
  CreditCard, 
  Calendar, 
  Users,
  TrendingUp
} from 'lucide-react';

const MarketplaceContent = () => {
  const [activeTab, setActiveTab] = useState('vendas');

  // Dados simulados
  const statusEmpreendimento = {
    disponivel: { count: 32, percent: 38, color: '#10b981' },
    vendida: { count: 45, percent: 53, color: '#ef4444' },
    reservada: { count: 8, percent: 9, color: '#f59e0b' }
  };

  const vendas = [
    {
      id: 1,
      unidade: 'Sala 1008',
      preco: 1380000,
      status: 'ativa',
      visualizacoes: 156,
      propostas: 3
    },
    {
      id: 2,
      unidade: 'Sala 1340',
      preco: 1920000,
      status: 'ativa',
      visualizacoes: 243,
      propostas: 5
    }
  ];

  const locacoes = [
    {
      id: 1,
      unidade: 'Sala 1008',
      valorAluguel: 8500,
      inquilino: 'Tech Solutions Ltda',
      vencimento: '15/02/2025',
      status: 'ocupada'
    },
    {
      id: 2,
      unidade: 'Sala 1224',
      valorAluguel: 9200,
      inquilino: 'Consultoria ABC',
      vencimento: '28/03/2025',
      status: 'ocupada'
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 style={{ 
            color: '#10b981', 
            fontWeight: '800', 
            marginBottom: '8px',
            fontSize: '32px'
          }}>
            Vendas e Locações
          </h1>
          <p className="text-muted mb-0" style={{ fontSize: '16px', fontWeight: '500' }}>
            Wall Street Corporate
          </p>
        </div>
      </div>

      <Row>
        {/* Seção Principal */}
        <Col lg={8} className="mb-4">
          {/* Tabs de Gestão */}
          <Card className="border-0 shadow-lg mb-4" style={{ borderRadius: '24px' }}>
            <Card.Body className="p-4">
              <div className="d-flex gap-2 mb-4">
                <Button
                  style={{
                    background: activeTab === 'vendas' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
                    color: activeTab === 'vendas' ? 'white' : '#10b981',
                    border: activeTab === 'vendas' ? 'none' : '2px solid #10b981',
                    borderRadius: '16px',
                    padding: '12px 24px',
                    fontWeight: '700'
                  }}
                  onClick={() => setActiveTab('vendas')}
                >
                  <DollarSign size={18} className="me-2" />
                  Gestão de Vendas
                </Button>
                <Button
                  style={{
                    background: activeTab === 'locacoes' ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' : 'transparent',
                    color: activeTab === 'locacoes' ? 'white' : '#3b82f6',
                    border: activeTab === 'locacoes' ? 'none' : '2px solid #3b82f6',
                    borderRadius: '16px',
                    padding: '12px 24px',
                    fontWeight: '700'
                  }}
                  onClick={() => setActiveTab('locacoes')}
                >
                  <Home size={18} className="me-2" />
                  Gestão de Locações
                </Button>
              </div>

              {activeTab === 'vendas' && (
                <div>
                  <h4 className="mb-4" style={{ color: '#0f172a', fontWeight: '700' }}>
                    Gestão de Vendas
                  </h4>
                  
                  {/* Features de Vendas */}
                  <Row className="mb-4">
                    <Col md={6} className="mb-3">
                      <div className="d-flex align-items-center p-3 rounded-3" style={{ backgroundColor: '#f0fdf4' }}>
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                          }}
                        >
                          <DollarSign size={20} className="text-white" />
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>
                            ✅ Definição de preço de venda
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <div className="d-flex align-items-center p-3 rounded-3" style={{ backgroundColor: '#f0fdf4' }}>
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                          }}
                        >
                          <Upload size={20} className="text-white" />
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>
                            ✅ Upload de fotos adicionais
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <div className="d-flex align-items-center p-3 rounded-3" style={{ backgroundColor: '#f0fdf4' }}>
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                          }}
                        >
                          <Eye size={20} className="text-white" />
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>
                            ✅ Acompanhamento de visualizações
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <div className="d-flex align-items-center p-3 rounded-3" style={{ backgroundColor: '#f0fdf4' }}>
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                          }}
                        >
                          <FileText size={20} className="text-white" />
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>
                            ✅ Histórico de propostas recebidas
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  {/* Lista de Vendas Ativas */}
                  <div>
                    <h5 className="mb-3" style={{ color: '#0f172a', fontWeight: '700' }}>
                      Anúncios Ativos
                    </h5>
                    {vendas.map((venda) => (
                      <Card key={venda.id} className="mb-3 border-2" style={{ borderColor: '#10b981', borderRadius: '16px' }}>
                        <Card.Body className="p-3">
                          <Row className="align-items-center">
                            <Col md={3}>
                              <h6 style={{ color: '#0f172a', fontWeight: '700' }}>{venda.unidade}</h6>
                              <Badge style={{ 
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                borderRadius: '12px'
                              }}>
                                À venda
                              </Badge>
                            </Col>
                            <Col md={3}>
                              <div className="text-center">
                                <div style={{ fontSize: '18px', fontWeight: '800', color: '#10b981' }}>
                                  R$ {venda.preco.toLocaleString('pt-BR')}
                                </div>
                                <small className="text-muted">Preço</small>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="text-center">
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
                                  {venda.visualizacoes}
                                </div>
                                <small className="text-muted">Visualizações</small>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="text-center">
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#f59e0b' }}>
                                  {venda.propostas}
                                </div>
                                <small className="text-muted">Propostas</small>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'locacoes' && (
                <div>
                  <h4 className="mb-4" style={{ color: '#0f172a', fontWeight: '700' }}>
                    Gestão de Locações
                  </h4>
                  
                  {/* Features de Locações */}
                  <Row className="mb-4">
                    <Col md={6} className="mb-3">
                      <div className="d-flex align-items-center p-3 rounded-3" style={{ backgroundColor: '#eff6ff' }}>
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                          }}
                        >
                          <DollarSign size={20} className="text-white" />
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>
                            ✅ Definição de valor do aluguel
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <div className="d-flex align-items-center p-3 rounded-3" style={{ backgroundColor: '#eff6ff' }}>
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                          }}
                        >
                          <Calendar size={20} className="text-white" />
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>
                            ✅ Período mínimo de contrato
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <div className="d-flex align-items-center p-3 rounded-3" style={{ backgroundColor: '#eff6ff' }}>
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                          }}
                        >
                          <Users size={20} className="text-white" />
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>
                            ✅ Controle de inquilinos
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <div className="d-flex align-items-center p-3 rounded-3" style={{ backgroundColor: '#eff6ff' }}>
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                          }}
                        >
                          <CreditCard size={20} className="text-white" />
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>
                            ✅ Histórico de pagamentos
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  {/* Lista de Locações Ativas */}
                  <div>
                    <h5 className="mb-3" style={{ color: '#0f172a', fontWeight: '700' }}>
                      Locações Ativas
                    </h5>
                    {locacoes.map((locacao) => (
                      <Card key={locacao.id} className="mb-3 border-2" style={{ borderColor: '#3b82f6', borderRadius: '16px' }}>
                        <Card.Body className="p-3">
                          <Row className="align-items-center">
                            <Col md={3}>
                              <h6 style={{ color: '#0f172a', fontWeight: '700' }}>{locacao.unidade}</h6>
                              <Badge style={{ 
                                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                borderRadius: '12px'
                              }}>
                                Locada
                              </Badge>
                            </Col>
                            <Col md={3}>
                              <div className="text-center">
                                <div style={{ fontSize: '16px', fontWeight: '800', color: '#3b82f6' }}>
                                  R$ {locacao.valorAluguel.toLocaleString('pt-BR')}
                                </div>
                                <small className="text-muted">Aluguel</small>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="text-center">
                                <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                                  {locacao.inquilino}
                                </div>
                                <small className="text-muted">Inquilino</small>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="text-center">
                                <div style={{ fontSize: '14px', fontWeight: '700', color: '#f59e0b' }}>
                                  {locacao.vencimento}
                                </div>
                                <small className="text-muted">Vencimento</small>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Status das Unidades Totais do Empreendimento */}
        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-lg" style={{ borderRadius: '24px' }}>
            <Card.Body className="p-4">
              <h5 className="mb-4" style={{ color: '#0f172a', fontWeight: '700' }}>
                Status das Unidades Totais do Empreendimento
              </h5>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <div 
                      style={{ 
                        width: '16px', 
                        height: '16px', 
                        borderRadius: '4px', 
                        background: statusEmpreendimento.disponivel.color,
                        marginRight: '8px' 
                      }}
                    ></div>
                    <span style={{ fontWeight: '600', color: '#0f172a' }}>Disponível</span>
                  </div>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>
                    {statusEmpreendimento.disponivel.count} unidades ({statusEmpreendimento.disponivel.percent}%)
                  </span>
                </div>
                <ProgressBar 
                  now={statusEmpreendimento.disponivel.percent}
                  style={{ height: '12px', borderRadius: '6px' }}
                  variant="success"
                />
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <div 
                      style={{ 
                        width: '16px', 
                        height: '16px', 
                        borderRadius: '4px', 
                        background: statusEmpreendimento.vendida.color,
                        marginRight: '8px' 
                      }}
                    ></div>
                    <span style={{ fontWeight: '600', color: '#0f172a' }}>Vendida</span>
                  </div>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>
                    {statusEmpreendimento.vendida.count} unidades ({statusEmpreendimento.vendida.percent}%)
                  </span>
                </div>
                <ProgressBar 
                  now={statusEmpreendimento.vendida.percent}
                  style={{ height: '12px', borderRadius: '6px' }}
                  variant="danger"
                />
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <div 
                      style={{ 
                        width: '16px', 
                        height: '16px', 
                        borderRadius: '4px', 
                        background: statusEmpreendimento.reservada.color,
                        marginRight: '8px' 
                      }}
                    ></div>
                    <span style={{ fontWeight: '600', color: '#0f172a' }}>Reservada</span>
                  </div>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>
                    {statusEmpreendimento.reservada.count} unidades ({statusEmpreendimento.reservada.percent}%)
                  </span>
                </div>
                <ProgressBar 
                  now={statusEmpreendimento.reservada.percent}
                  style={{ height: '12px', borderRadius: '6px' }}
                  variant="warning"
                />
              </div>

              {/* Preview da Tela */}
              <div className="mt-4 p-3 rounded-3" style={{ backgroundColor: '#f8fafc' }}>
                <div style={{ 
                  background: 'white', 
                  borderRadius: '8px', 
                  padding: '16px',
                  border: '1px solid #e5e7eb',
                  fontSize: '12px'
                }}>
                  <div className="mb-2" style={{ fontWeight: '700', fontSize: '10px' }}>
                    🏢 Wall Street Corporate
                  </div>
                  <div className="mb-2">
                    <strong>Gestão de Vendas</strong>
                  </div>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>
                    Acompanhe e gerencie suas unidades em desenvolvimento
                  </div>
                  <div className="mt-2 p-2 rounded" style={{ background: '#f1f5f9', fontSize: '9px' }}>
                    Funcionalidades em Desenvolvimento
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MarketplaceContent;
