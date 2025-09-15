import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Nav, Navbar, Form, Badge, Table, Modal } from 'react-bootstrap';
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
  Package,
  Download,
  Bell,
  CreditCard,
  Shield,
  Award,
  Target,
  PieChart,
  Activity,
  Menu,
  X
} from 'lucide-react';

// --- Componentes de Página ---

// Dashboard Principal - Design Premium
const DashboardContent = () => {
  const investimentoTotal = 3650000;
  const valorAtual = 4420000;
  const valorizacao = ((valorAtual - investimentoTotal) / investimentoTotal * 100).toFixed(1);

  return (
    <div>
      {/* Header da Seção */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 style={{ 
            color: '#0f172a', 
            fontWeight: '800', 
            marginBottom: '8px',
            fontSize: '32px',
            letterSpacing: '-0.5px'
          }}>
            Dashboard
          </h1>
          <p className="text-muted mb-0" style={{ fontSize: '16px', fontWeight: '500' }}>
            Acompanhe seus investimentos em tempo real
          </p>
        </div>
        <Badge 
          style={{ 
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            fontSize: '14px', 
            padding: '12px 20px',
            borderRadius: '25px',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(16,185,129,0.3)'
          }}
        >
          <Shield size={16} className="me-2" />
          Carteira Ativa
        </Badge>
      </div>

      {/* Cards de Métricas Premium */}
      <Row className="mb-5">
        <Col xl={3} lg={6} md={6} className="mb-4">
          <Card 
            className="border-0 shadow-lg h-100 overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
              borderRadius: '24px',
              transform: 'translateY(0)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Card.Body className="p-4 text-white position-relative">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div 
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                    boxShadow: '0 8px 25px rgba(245,158,11,0.4)'
                  }}
                >
                  <Building size={28} />
                </div>
                <Badge 
                  style={{ 
                    background: 'rgba(255,255,255,0.2)', 
                    borderRadius: '20px',
                    fontWeight: '600'
                  }}
                >
                  3 Salas
                </Badge>
              </div>
              <h4 className="mb-2" style={{ fontWeight: '700' }}>Propriedades</h4>
              <p className="mb-0 opacity-90" style={{ fontWeight: '500' }}>Wall Street Corporate</p>

              {/* Elemento decorativo */}
              <div 
                className="position-absolute"
                style={{
                  bottom: '-20px',
                  right: '-20px',
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(249,115,22,0.1) 100%)',
                  borderRadius: '50%'
                }}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col xl={3} lg={6} md={6} className="mb-4">
          <Card 
            className="border-0 shadow-lg h-100"
            style={{ 
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              transform: 'translateY(0)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div 
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    boxShadow: '0 8px 25px rgba(16,185,129,0.3)'
                  }}
                >
                  <DollarSign size={28} style={{ color: 'white' }} />
                </div>
                <TrendingUp size={24} style={{ color: '#10b981' }} />
              </div>
              <h5 style={{ 
                color: '#10b981', 
                fontWeight: '800', 
                fontSize: '28px',
                marginBottom: '8px'
              }}>
                R$ {investimentoTotal.toLocaleString('pt-BR')}
              </h5>
              <p className="text-muted mb-0" style={{ fontWeight: '600' }}>Valor Investido</p>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={3} lg={6} md={6} className="mb-4">
          <Card 
            className="border-0 shadow-lg h-100"
            style={{ 
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #ffffff 0%, #fef3c7 50%, #fbbf24 100%)',
              transform: 'translateY(0)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div 
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    boxShadow: '0 8px 25px rgba(245,158,11,0.3)'
                  }}
                >
                  <Award size={28} style={{ color: 'white' }} />
                </div>
                <Activity size={24} style={{ color: '#d97706' }} />
              </div>
              <h5 style={{ 
                color: '#d97706', 
                fontWeight: '800', 
                fontSize: '28px',
                marginBottom: '8px'
              }}>
                R$ {valorAtual.toLocaleString('pt-BR')}
              </h5>
              <p className="text-muted mb-2" style={{ fontWeight: '600' }}>Valor Atual</p>
              <Badge 
                style={{ 
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  fontWeight: '700',
                  padding: '6px 12px',
                  borderRadius: '12px'
                }}
              >
                +{valorizacao}%
              </Badge>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={3} lg={6} md={6} className="mb-4">
          <Card 
            className="border-0 shadow-lg h-100"
            style={{ 
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #ffffff 0%, #dbeafe 50%, #3b82f6 100%)',
              transform: 'translateY(0)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Card.Body className="p-4 text-white position-relative">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div 
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    background: 'rgba(15,23,42,0.15)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Target size={28} style={{ color: '#0f172a' }} />
                </div>
                <TrendingUp size={24} style={{ color: '#0f172a' }} />
              </div>
              <h4 style={{ fontWeight: '800', marginBottom: '2px', fontSize: '32px', color: '#0f172a' }}>+{valorizacao}%</h4>
              <p className="mb-3" style={{ fontWeight: '600', fontSize: '16px', color: '#374151' }}>Rentabilidade Total</p>

              {/* Informações adicionais */}
              <div className="d-flex flex-column gap-2" style={{ fontSize: '13px' }}>
                <div className="d-flex justify-content-between">
                  <span style={{ color: '#64748b' }}>Período:</span>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>12 meses</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span style={{ color: '#64748b' }}>Ganho:</span>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>R$ {(valorAtual - investimentoTotal).toLocaleString('pt-BR')}</span>
                </div>
              </div>

              {/* Elemento decorativo */}
              <div 
                className="position-absolute"
                style={{
                  bottom: '-15px',
                  right: '-15px',
                  width: '60px',
                  height: '60px',
                  background: 'rgba(59,130,246,0.1)',
                  borderRadius: '50%'
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Seção de Performance e Status */}
      <Row className="mb-5">
        <Col lg={8} className="mb-4">
          <Card 
            className="border-0 shadow-lg h-100" 
            style={{ 
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }}
          >
            <Card.Body className="p-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 style={{ color: '#0f172a', fontWeight: '700' }}>Valorização dos Imóveis</h4>
                  <p className="text-muted mb-0" style={{ fontSize: '14px', fontWeight: '500' }}>
                    Histórico mensal de valorização das salas
                  </p>
                </div>
                <Button 
                  size="sm"
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                    border: 'none',
                    borderRadius: '20px',
                    fontWeight: '600'
                  }}
                >
                  Ver Relatório
                </Button>
              </div>
              <div 
                style={{ 
                  height: '320px', 
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', 
                  borderRadius: '16px',
                  border: '2px solid #f1f5f9',
                  padding: '20px',
                  position: 'relative'
                }} 
              >
                {/* Gráfico de Linha Simulado */}
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  {/* Eixo Y (Valores) */}
                  <div style={{ position: 'absolute', left: '0', top: '0', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                    <span>R$ 4.5M</span>
                    <span>R$ 4.2M</span>
                    <span>R$ 3.9M</span>
                    <span>R$ 3.6M</span>
                  </div>

                  {/* Área do Gráfico */}
                  <div style={{ marginLeft: '60px', height: '100%', position: 'relative' }}>
                    {/* Linhas de Grid */}
                    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
                      <div style={{ position: 'absolute', top: '0%', width: '100%', height: '1px', backgroundColor: '#e5e7eb' }}></div>
                      <div style={{ position: 'absolute', top: '25%', width: '100%', height: '1px', backgroundColor: '#e5e7eb' }}></div>
                      <div style={{ position: 'absolute', top: '50%', width: '100%', height: '1px', backgroundColor: '#e5e7eb' }}></div>
                      <div style={{ position: 'absolute', top: '75%', width: '100%', height: '1px', backgroundColor: '#e5e7eb' }}></div>
                      <div style={{ position: 'absolute', top: '100%', width: '100%', height: '1px', backgroundColor: '#e5e7eb' }}></div>
                    </div>

                    {/* Linha do Gráfico */}
                    <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                      <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgba(245,158,11,0.3)" />
                          <stop offset="50%" stopColor="rgba(16,185,129,0.2)" />
                          <stop offset="100%" stopColor="rgba(16,185,129,0.1)" />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M 0,100 L 0,90 Q 60,85 120,75 T 240,55 T 360,35 T 480,20 L 480,100 Z"
                        fill="url(#areaGradient)"
                        stroke="none"
                        opacity="0.6"
                      />
                      <path 
                        d="M 0,90 Q 60,85 120,75 T 240,55 T 360,35 T 480,20"
                        stroke="url(#lineGradient)"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        filter="drop-shadow(0 2px 4px rgba(245,158,11,0.3))"
                      />
                      {/* Pontos do gráfico */}
                      <circle cx="0" cy="90" r="4" fill="#f59e0b" />
                      <circle cx="120" cy="75" r="4" fill="#f59e0b" />
                      <circle cx="240" cy="55" r="4" fill="#f59e0b" />
                      <circle cx="360" cy="35" r="4" fill="#10b981" />
                      <circle cx="480" cy="20" r="4" fill="#10b981" />
                    </svg>

                    {/* Eixo X (Meses) */}
                    <div style={{ position: 'absolute', bottom: '-25px', width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                      <span>Jan</span>
                      <span>Mar</span>
                      <span>Mai</span>
                      <span>Jul</span>
                      <span>Set</span>
                      <span>Nov</span>
                    </div>
                  </div>
                </div>

                {/* Legenda */}
                <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', fontWeight: '600', color: '#0f172a' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b', marginRight: '6px' }}></div>
                    Valor Inicial
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', fontWeight: '600', color: '#0f172a' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', marginRight: '6px' }}></div>
                    Valor Atual
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} className="mb-4">
          <Card 
            className="border-0 shadow-lg h-100" 
            style={{ 
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }}
          >
            <Card.Body className="p-5">
              <h4 className="mb-4" style={{ color: '#0f172a', fontWeight: '700' }}>
                Status do Empreendimento
              </h4>

              <div className="text-center mb-4">
                <div 
                  className="mx-auto mb-4 position-relative"
                  style={{ width: '140px', height: '140px' }}
                >
                  <svg width="140" height="140" viewBox="0 0 140 140">
                    <circle
                      cx="70"
                      cy="70"
                      r="60"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="10"
                    />
                    <circle
                      cx="70"
                      cy="70"
                      r="60"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="10"
                      strokeDasharray={`${78 * 3.77} ${100 * 3.77}`}
                      strokeDashoffset="94.2"
                      transform="rotate(-90 70 70)"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#f97316" />
                      </linearGradient>
                    </defs>
                    <text
                      x="70"
                      y="70"
                      textAnchor="middle"
                      dy="8"
                      fontSize="24"
                      fontWeight="800"
                      fill="#0f172a"
                    >
                      78%
                    </text>
                  </svg>
                </div>
                <h5 style={{ color: '#0f172a', fontWeight: '700' }}>Construção Concluída</h5>
                <p className="text-muted" style={{ fontWeight: '500' }}>Previsão: Dezembro 2024</p>
              </div>

              <div className="border-top pt-4">
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted" style={{ fontWeight: '600' }}>Vendas do Prédio</span>
                  <span style={{ fontWeight: '800', color: '#0f172a' }}>82%</span>
                </div>
                <div style={{ height: '12px', backgroundColor: '#e2e8f0', borderRadius: '6px' }}>
                  <div 
                    style={{ 
                      width: '82%', 
                      height: '100%', 
                      background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                      borderRadius: '6px',
                      boxShadow: '0 2px 8px rgba(16,185,129,0.3)'
                    }}
                  ></div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Ações Rápidas */}
      <Row>
        <Col lg={6} className="mb-4">
          <Card 
            className="border-0 shadow-lg" 
            style={{ 
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }}
          >
            <Card.Body className="p-5">
              <h4 className="mb-4" style={{ color: '#0f172a', fontWeight: '700' }}>Ações Rápidas</h4>
              <Row>
                <Col md={6} className="mb-3">
                  <Button 
                    className="w-100 d-flex align-items-center justify-content-center"
                    style={{ 
                      background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                      border: 'none',
                      borderRadius: '16px',
                      padding: '20px',
                      boxShadow: '0 8px 25px rgba(245,158,11,0.3)',
                      fontWeight: '700',
                      fontSize: '16px'
                    }}
                  >
                    <Download size={20} className="me-2" />
                    Extratos
                  </Button>
                </Col>
                <Col md={6} className="mb-3">
                  <Button 
                    variant="outline-primary"
                    className="w-100 d-flex align-items-center justify-content-center"
                    style={{ 
                      borderColor: '#0f172a',
                      color: '#0f172a',
                      borderRadius: '16px',
                      padding: '20px',
                      borderWidth: '2px',
                      fontWeight: '700',
                      fontSize: '16px'
                    }}
                  >
                    <MessageCircle size={20} className="me-2" />
                    Suporte
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card 
            className="border-0 shadow-lg" 
            style={{ 
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }}
          >
            <Card.Body className="p-5">
              <h4 className="mb-4" style={{ color: '#0f172a', fontWeight: '700' }}>Próximas Ações</h4>
              <div className="d-flex align-items-center mb-3 p-3 rounded-3" style={{ backgroundColor: '#f1f5f9' }}>
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)'
                  }}
                >
                  <Calendar size={20} className="text-white" />
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: '#0f172a' }}>Relatório Trimestral</div>
                  <small className="text-muted" style={{ fontWeight: '500' }}>Disponível em 5 dias</small>
                </div>
              </div>
              <div className="d-flex align-items-center p-3 rounded-3" style={{ backgroundColor: '#f1f5f9' }}>
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                  }}
                >
                  <Bell size={20} className="text-white" />
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: '#0f172a' }}>Reunião de Investidores</div>
                  <small className="text-muted" style={{ fontWeight: '500' }}>15 de Março, 14h</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const PortfolioContent = () => (
  <div>
    <h2 style={{ color: '#0f172a', fontWeight: '800', fontSize: '32px' }} className="mb-4">Meu Portfólio</h2>
    <p className="text-muted mb-5" style={{ fontSize: '16px', fontWeight: '500' }}>
      Detalhes das suas propriedades e investimentos
    </p>

    <Row>
      {[1, 2, 3].map((item) => (
        <Col lg={4} key={item} className="mb-4">
          <Card className="border-0 shadow-lg" style={{ borderRadius: '24px' }}>
            <div style={{ height: '220px', background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', borderRadius: '24px 24px 0 0' }}>
              <img 
                src={`/src/img/salas/sala${item}.png`}
                alt={`Sala ${item}`}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '24px 24px 0 0'
                }}
              />
            </div>
            <Card.Body className="p-4">
              <h5 className="mb-2" style={{ color: '#0f172a', fontWeight: '700' }}>Sala {1000 + item * 8}</h5>
              <p className="text-muted small mb-3" style={{ fontWeight: '500' }}>
                {60 + item * 8}.{item}0 m² • {10 + item}° Andar
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="small text-muted" style={{ fontWeight: '600' }}>Valorização</div>
                  <div style={{ fontWeight: '800', color: '#10b981', fontSize: '18px' }}>+{15 + item * 2}%</div>
                </div>
                <Button 
                  size="sm"
                  style={{ 
                    background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                    border: 'none',
                    borderRadius: '20px',
                    fontWeight: '600',
                    padding: '8px 16px'
                  }}
                >
                  Ver Detalhes
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

const PerformanceContent = () => (
  <div>
    <h2 style={{ color: '#0f172a', fontWeight: '800', fontSize: '32px' }} className="mb-4">Performance</h2>
    <p className="text-muted mb-5" style={{ fontSize: '16px', fontWeight: '500' }}>
      Análise detalhada do desempenho dos seus investimentos
    </p>

    <Card className="border-0 shadow-lg" style={{ borderRadius: '24px' }}>
      <Card.Body className="p-5 text-center">
        <div 
          className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
          style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            boxShadow: '0 8px 25px rgba(59,130,246,0.3)'
          }}
        >
          <BarChart3 size={50} className="text-white" />
        </div>
        <h4 style={{ color: '#0f172a', fontWeight: '700' }}>Relatórios de Performance</h4>
        <p className="text-muted" style={{ fontWeight: '500' }}>Gráficos e análises detalhadas em desenvolvimento</p>
      </Card.Body>
    </Card>
  </div>
);

const MarketplaceContent = () => (
  <div>
    <h2 style={{ color: '#0f172a', fontWeight: '800', fontSize: '32px' }} className="mb-4">Marketplace</h2>
    <p className="text-muted mb-5" style={{ fontSize: '16px', fontWeight: '500' }}>
      Oportunidades de compra e venda entre investidores
    </p>

    <Card className="border-0 shadow-lg" style={{ borderRadius: '24px' }}>
      <Card.Body className="p-5 text-center">
        <div 
          className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
          style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            boxShadow: '0 8px 25px rgba(16,185,129,0.3)'
          }}
        >
          <Building size={50} className="text-white" />
        </div>
        <h4 style={{ color: '#0f172a', fontWeight: '700' }}>Marketplace de Propriedades</h4>
        <p className="text-muted" style={{ fontWeight: '500' }}>
          Em breve: compre e venda propriedades diretamente na plataforma
        </p>
      </Card.Body>
    </Card>
  </div>
);

const DocumentosContent = () => (
  <div>
    <h2 style={{ color: '#0f172a', fontWeight: '800', fontSize: '32px' }} className="mb-4">Documentos</h2>
    <p className="text-muted mb-5" style={{ fontSize: '16px', fontWeight: '500' }}>
      Acesse todos os seus documentos e contratos
    </p>

    <Row>
      <Col lg={8} className="mb-4">
        <Card className="border-0 shadow-lg" style={{ borderRadius: '24px' }}>
          <Card.Body className="p-5">
            <div className="d-flex align-items-center mb-4">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                  boxShadow: '0 8px 25px rgba(245,158,11,0.3)'
                }}
              >
                <FileText size={28} className="text-white" />
              </div>
              <h4 className="mb-0" style={{ color: '#0f172a', fontWeight: '700' }}>Contratos</h4>
            </div>

            <div className="mb-4">
              {[
                'Contrato de Compra e Venda - Sala 1008',
                'Contrato de Compra e Venda - Sala 1116', 
                'Contrato de Compra e Venda - Sala 1224'
              ].map((doc, index) => (
                <div key={index} className="d-flex align-items-center justify-content-between p-3 mb-2 rounded-3" style={{ backgroundColor: '#f8fafc' }}>
                  <div className="d-flex align-items-center">
                    <FileText size={20} className="me-3" style={{ color: '#64748b' }} />
                    <span style={{ fontWeight: '600', color: '#0f172a' }}>{doc}</span>
                  </div>
                  <Button 
                    size="sm"
                    variant="outline-primary"
                    style={{ 
                      borderRadius: '12px',
                      fontWeight: '600'
                    }}
                  >
                    <Download size={14} className="me-1" />
                    Baixar
                  </Button>
                </div>
              ))}
            </div>

            <Button 
              style={{ 
                background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                border: 'none',
                borderRadius: '16px',
                fontWeight: '700',
                padding: '12px 24px'
              }}
            >
              <Download size={16} className="me-2" />
              Baixar Todos
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </div>
);

const ComunicadosContent = () => (
  <div>
    <h2 style={{ color: '#0f172a', fontWeight: '800', fontSize: '32px' }} className="mb-4">Comunicados</h2>
    <p className="text-muted mb-5" style={{ fontSize: '16px', fontWeight: '500' }}>
      Últimas notícias e atualizações do empreendimento
    </p>

    <Card className="border-0 shadow-lg" style={{ borderRadius: '24px' }}>
      <Card.Body className="p-5 text-center">
        <div 
          className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
          style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
            boxShadow: '0 8px 25px rgba(245,158,11,0.3)'
          }}
        >
          <Bell size={50} className="text-white" />
        </div>
        <h4 style={{ color: '#0f172a', fontWeight: '700' }}>Nenhum comunicado novo</h4>
        <p className="text-muted" style={{ fontWeight: '500' }}>
          Você receberá notificações sobre atualizações importantes aqui
        </p>
      </Card.Body>
    </Card>
  </div>
);

const FinanceiroContent = () => (
  <div>
    <h2 style={{ color: '#0f172a', fontWeight: '800', fontSize: '32px' }} className="mb-4">Financeiro</h2>
    <p className="text-muted mb-5" style={{ fontSize: '16px', fontWeight: '500' }}>
      Controle financeiro e histórico de transações
    </p>

    <Card className="border-0 shadow-lg" style={{ borderRadius: '24px' }}>
      <Card.Body className="p-5 text-center">
        <div 
          className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
          style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            boxShadow: '0 8px 25px rgba(59,130,246,0.3)'
          }}
        >
          <CreditCard size={50} className="text-white" />
        </div>
        <h4 style={{ color: '#0f172a', fontWeight: '700' }}>Gestão Financeira</h4>
        <p className="text-muted" style={{ fontWeight: '500' }}>
          Histórico de pagamentos e controle financeiro
        </p>
      </Card.Body>
    </Card>
  </div>
);

const ConfiguracoesContent = () => (
  <div>
    <h2 style={{ color: '#0f172a', fontWeight: '800', fontSize: '32px' }} className="mb-4">Configurações</h2>
    <p className="text-muted mb-5" style={{ fontSize: '16px', fontWeight: '500' }}>
      Gerencie suas informações pessoais e preferências
    </p>

    <Card className="border-0 shadow-lg" style={{ borderRadius: '24px' }}>
      <Card.Body className="p-5">
        <h4 className="mb-4" style={{ color: '#0f172a', fontWeight: '700' }}>Informações Pessoais</h4>
        <Form>
          <Row>
            <Col md={6} className="mb-4">
              <Form.Group>
                <Form.Label style={{ fontWeight: '600', color: '#374151' }}>Nome Completo</Form.Label>
                <Form.Control 
                  type="text" 
                  defaultValue="Ivan Silva" 
                  style={{ 
                    borderRadius: '16px',
                    border: '2px solid #e5e7eb',
                    padding: '12px 16px',
                    fontWeight: '500'
                  }} 
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-4">
              <Form.Group>
                <Form.Label style={{ fontWeight: '600', color: '#374151' }}>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  defaultValue="ivan@gmail.com" 
                  style={{ 
                    borderRadius: '16px',
                    border: '2px solid #e5e7eb',
                    padding: '12px 16px',
                    fontWeight: '500'
                  }} 
                />
              </Form.Group>
            </Col>
          </Row>
          <Button 
            style={{ 
              background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
              border: 'none',
              borderRadius: '16px',
              padding: '14px 28px',
              fontWeight: '700',
              boxShadow: '0 8px 25px rgba(245,158,11,0.3)'
            }}
          >
            Salvar Alterações
          </Button>
        </Form>
      </Card.Body>
    </Card>
  </div>
);


const AreaMembro = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const membroNome = localStorage.getItem('membro-nome') || 'Ivan Silva';

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
    { id: 'portfolio', icon: Building, label: 'Meu Portfólio', component: <PortfolioContent /> },
    { id: 'performance', icon: TrendingUp, label: 'Performance', component: <PerformanceContent /> },
    { id: 'marketplace', icon: DollarSign, label: 'Marketplace', component: <MarketplaceContent /> },
    { id: 'documentos', icon: FileText, label: 'Documentos', component: <DocumentosContent /> },
    { id: 'comunicados', icon: Bell, label: 'Comunicados', component: <ComunicadosContent /> },
    { id: 'financeiro', icon: CreditCard, label: 'Financeiro', component: <FinanceiroContent /> },
    { id: 'configuracoes', icon: Settings, label: 'Configurações', component: <ConfiguracoesContent /> }
  ];

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header Premium */}
      <Navbar 
        expand="lg" 
        style={{ 
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          padding: '1.5rem 0',
          boxShadow: '0 20px 40px rgba(15,23,42,0.15)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Container fluid className="px-4">
          <Navbar.Brand className="text-white d-flex align-items-center">
            <div 
              className="d-inline-flex align-items-center justify-content-center rounded-3 me-3"
              style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ea580c 100%)',
                boxShadow: '0 8px 25px rgba(245,158,11,0.4)',
                border: '2px solid rgba(255,255,255,0.2)'
              }}
            >
              <span style={{ color: 'white', fontWeight: '900', fontSize: '26px', letterSpacing: '-1px' }}>W</span>
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '0.5px', lineHeight: '1' }}>
                WALL STREET
              </div>
              <div style={{ fontSize: '13px', opacity: 0.85, letterSpacing: '3px', fontWeight: '600' }}>
                CORPORATE
              </div>
            </div>
          </Navbar.Brand>

          <div className="d-flex align-items-center text-white">
            <div className="me-4 d-none d-lg-block">
              <div style={{ fontSize: '13px', opacity: 0.7, fontWeight: '500' }}>Bem-vindo,</div>
              <div style={{ fontSize: '18px', fontWeight: '700' }}>{membroNome}</div>
            </div>

            {/* Mobile Menu Button */}
            <Button 
              variant="outline-light" 
              size="sm" 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="d-lg-none me-3"
              style={{
                borderRadius: '12px',
                padding: '10px',
                borderColor: 'rgba(255,255,255,0.3)'
              }}
            >
              {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
            </Button>

            <Button 
              variant="outline-light" 
              size="sm" 
              onClick={logout}
              className="d-flex align-items-center"
              style={{
                borderRadius: '25px',
                padding: '12px 20px',
                transition: 'all 0.3s ease',
                borderColor: 'rgba(255,255,255,0.3)',
                fontWeight: '600'
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
          {/* Sidebar Desktop */}
          <Col lg={2} md={3} className="p-0 d-none d-lg-block">
            <div 
              style={{ 
                background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
                minHeight: 'calc(100vh - 100px)',
                padding: '2rem 0',
                borderRight: '1px solid #e2e8f0',
                boxShadow: '4px 0 15px rgba(0,0,0,0.05)'
              }}
            >
              <Nav className="flex-column px-3">
                {menuItems.map((item) => (
                  <Nav.Link
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`d-flex align-items-center px-4 py-3 mb-2 position-relative ${
                      activeSection === item.id ? 'active-menu-item' : ''
                    }`}
                    style={{
                      cursor: 'pointer',
                      color: activeSection === item.id ? '#0f172a' : '#64748b',
                      backgroundColor: activeSection === item.id ? '#f1f5f9' : 'transparent',
                      borderRadius: '16px',
                      borderLeft: activeSection === item.id ? '4px solid #f59e0b' : '4px solid transparent',
                      transition: 'all 0.3s ease',
                      fontWeight: activeSection === item.id ? '700' : '600',
                      fontSize: '15px',
                      marginLeft: activeSection === item.id ? '8px' : '0px',
                      boxShadow: activeSection === item.id ? '0 4px 12px rgba(245,158,11,0.15)' : 'none'
                    }}
                  >
                    <item.icon size={22} className="me-3" />
                    <span>{item.label}</span>
                  </Nav.Link>
                ))}
              </Nav>
            </div>
          </Col>

          {/* Mobile Sidebar */}
          {showMobileMenu && (
            <div 
              className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
              style={{ 
                backgroundColor: 'rgba(0,0,0,0.5)', 
                zIndex: 1050,
                paddingTop: '100px'
              }}
              onClick={() => setShowMobileMenu(false)}
            >
              <div 
                className="bg-white h-100 shadow-lg"
                style={{ width: '280px', padding: '2rem 0' }}
                onClick={(e) => e.stopPropagation()}
              >
                <Nav className="flex-column px-3">
                  {menuItems.map((item) => (
                    <Nav.Link
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setShowMobileMenu(false);
                      }}
                      className={`d-flex align-items-center px-4 py-3 mb-2 ${
                        activeSection === item.id ? 'active-menu-item' : ''
                      }`}
                      style={{
                        cursor: 'pointer',
                        color: activeSection === item.id ? '#0f172a' : '#64748b',
                        backgroundColor: activeSection === item.id ? '#f1f5f9' : 'transparent',
                        borderRadius: '16px',
                        borderLeft: activeSection === item.id ? '4px solid #f59e0b' : '4px solid transparent',
                        fontWeight: activeSection === item.id ? '700' : '600',
                        fontSize: '15px'
                      }}
                    >
                      <item.icon size={22} className="me-3" />
                      <span>{item.label}</span>
                    </Nav.Link>
                  ))}
                </Nav>
              </div>
            </div>
          )}

          {/* Main Content */}
          <Col lg={10} md={9} className="p-4">
            {menuItems.find(item => item.id === activeSection)?.component}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AreaMembro;