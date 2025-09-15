
import React, { useState } from 'react';
import { Card, Row, Col, Button, Badge } from 'react-bootstrap';
import { 
  Bell, 
  FileText, 
  MessageCircle, 
  Upload, 
  Users,
  Settings,
  Zap,
  TrendingUp,
  Shield,
  Smartphone
} from 'lucide-react';

const ConfiguracoesContent = () => {
  const [activeFeature, setActiveFeature] = useState('notifications');

  const proximosPassos = [
    {
      id: 'notifications',
      icon: Bell,
      title: 'Sistema de Notificações',
      description: 'Alertas sobre propostas, vencimentos e oportunidades de negócio.',
      status: 'desenvolvimento',
      color: '#3b82f6'
    },
    {
      id: 'reports',
      icon: FileText,
      title: 'Relatórios Detalhados',
      description: 'PDFs com análise de performance e comparativos de mercado.',
      status: 'planejado',
      color: '#10b981'
    },
    {
      id: 'chat',
      icon: MessageCircle,
      title: 'Chat com Corretores',
      description: 'Comunicação direta com a equipe de vendas e suporte.',
      status: 'futuro',
      color: '#f59e0b'
    },
    {
      id: 'documents',
      icon: Upload,
      title: 'Documentos Digitais',
      description: 'Upload e gestão de contratos e documentação legal.',
      status: 'desenvolvimento',
      color: '#8b5cf6'
    },
    {
      id: 'crm',
      icon: Users,
      title: 'Integração com CRM - Futura para Corretores',
      description: 'Conexão com sistemas de vendas e gestão de clientes.',
      status: 'futuro',
      color: '#ef4444'
    }
  ];

  const getStatusInfo = (status) => {
    switch(status) {
      case 'desenvolvimento':
        return { text: 'Em Desenvolvimento', bg: '#dbeafe', color: '#1d4ed8' };
      case 'planejado':
        return { text: 'Planejado', bg: '#dcfce7', color: '#16a34a' };
      case 'futuro':
        return { text: 'Futuro', bg: '#fef3c7', color: '#d97706' };
      default:
        return { text: 'Indefinido', bg: '#f1f5f9', color: '#64748b' };
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 style={{ 
            color: '#8b5cf6', 
            fontWeight: '800', 
            marginBottom: '8px',
            fontSize: '32px'
          }}>
            Próximos Passos
          </h1>
          <p className="text-muted mb-0" style={{ fontSize: '16px', fontWeight: '500' }}>
            Wall Street Corporate
          </p>
        </div>
      </div>

      {/* Evolução da Plataforma */}
      <Card className="border-0 shadow-lg mb-5" style={{ borderRadius: '24px' }}>
        <Card.Body className="p-5">
          <h3 className="mb-4" style={{ color: '#0f172a', fontWeight: '700' }}>
            Evolução da Plataforma
          </h3>
          
          <p className="text-muted mb-4" style={{ fontSize: '16px', fontWeight: '500' }}>
            Sugestões para aprimorar a experiência do investidor e expandir as funcionalidades da área do cliente.
          </p>

          <Row>
            {proximosPassos.map((feature) => (
              <Col lg={6} key={feature.id} className="mb-4">
                <Card 
                  className={`border-2 h-100 cursor-pointer ${activeFeature === feature.id ? 'border-primary' : 'border-light'}`}
                  style={{ 
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onClick={() => setActiveFeature(feature.id)}
                >
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-start justify-content-between mb-3">
                      <div 
                        className="rounded-3 d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: '60px',
                          height: '60px',
                          background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)`,
                          boxShadow: `0 8px 25px ${feature.color}33`
                        }}
                      >
                        <feature.icon size={28} className="text-white" />
                      </div>
                      <Badge 
                        style={{ 
                          background: getStatusInfo(feature.status).bg,
                          color: getStatusInfo(feature.status).color,
                          borderRadius: '12px',
                          fontWeight: '600',
                          fontSize: '11px'
                        }}
                      >
                        {getStatusInfo(feature.status).text}
                      </Badge>
                    </div>
                    
                    <h5 className="mb-2" style={{ color: '#0f172a', fontWeight: '700' }}>
                      {feature.title}
                    </h5>
                    
                    <p className="text-muted mb-0" style={{ fontWeight: '500', fontSize: '14px', lineHeight: '1.5' }}>
                      {feature.description}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      <Row>
        {/* Next Steps Visual */}
        <Col lg={8} className="mb-4">
          <Card className="border-0 shadow-lg" style={{ borderRadius: '24px' }}>
            <Card.Body className="p-5">
              <h4 className="mb-4" style={{ color: '#0f172a', fontWeight: '700' }}>
                NEXT STEPS
              </h4>
              
              {/* Fluxo Visual dos Próximos Passos */}
              <div style={{ background: '#f8fafc', borderRadius: '20px', padding: '40px', textAlign: 'center' }}>
                <div className="d-flex justify-content-center align-items-center gap-4 mb-4">
                  {/* Step 1 */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center mb-2"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        boxShadow: '0 8px 25px rgba(59,130,246,0.3)'
                      }}
                    >
                      <Bell size={36} className="text-white" />
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>
                      Notificações
                    </div>
                  </div>

                  {/* Seta */}
                  <div style={{ fontSize: '24px', color: '#64748b' }}>→</div>

                  {/* Step 2 */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center mb-2"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        boxShadow: '0 8px 25px rgba(16,185,129,0.3)'
                      }}
                    >
                      <TrendingUp size={36} className="text-white" />
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>
                      Analytics
                    </div>
                  </div>

                  {/* Seta */}
                  <div style={{ fontSize: '24px', color: '#64748b' }}>→</div>

                  {/* Step 3 */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center mb-2"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                        boxShadow: '0 8px 25px rgba(245,158,11,0.3)'
                      }}
                    >
                      <MessageCircle size={36} className="text-white" />
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>
                      Comunicação
                    </div>
                  </div>

                  {/* Seta */}
                  <div style={{ fontSize: '24px', color: '#64748b' }}>→</div>

                  {/* Step 4 */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center mb-2"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                        boxShadow: '0 8px 25px rgba(139,92,246,0.3)'
                      }}
                    >
                      <FileText size={36} className="text-white" />
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>
                      Documentos
                    </div>
                  </div>
                </div>

                {/* Ilustração de Casa */}
                <div style={{ marginTop: '40px' }}>
                  <div style={{ fontSize: '80px', color: '#64748b', marginBottom: '20px' }}>
                    🏢
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '24px', color: '#64748b' }}>
                    <span>+</span>
                    <span>○</span>
                    <span>+</span>
                  </div>
                </div>
              </div>

              {/* Cronograma de Desenvolvimento */}
              <div className="mt-5">
                <h5 className="mb-4" style={{ color: '#0f172a', fontWeight: '700' }}>
                  Cronograma de Implementação
                </h5>
                
                <div className="timeline">
                  <div className="d-flex align-items-center mb-3 p-3 rounded-3" style={{ backgroundColor: '#dbeafe' }}>
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                      }}
                    >
                      <span style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>1</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', color: '#0f172a' }}>Fase 1: Sistema de Notificações</div>
                      <small className="text-muted" style={{ fontWeight: '500' }}>Alertas em tempo real - Q1 2025</small>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mb-3 p-3 rounded-3" style={{ backgroundColor: '#f0fdf4' }}>
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      }}
                    >
                      <span style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>2</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', color: '#0f172a' }}>Fase 2: Relatórios Avançados</div>
                      <small className="text-muted" style={{ fontWeight: '500' }}>Analytics e insights - Q2 2025</small>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mb-3 p-3 rounded-3" style={{ backgroundColor: '#fef3c7' }}>
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)'
                      }}
                    >
                      <span style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>3</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', color: '#0f172a' }}>Fase 3: Comunicação Integrada</div>
                      <small className="text-muted" style={{ fontWeight: '500' }}>Chat e suporte - Q3 2025</small>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Informações Complementares */}
        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-lg mb-4" style={{ borderRadius: '24px' }}>
            <Card.Body className="p-4">
              <h5 className="mb-4" style={{ color: '#0f172a', fontWeight: '700' }}>
                Benefícios das Melhorias
              </h5>
              
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    }}
                  >
                    <Zap size={20} className="text-white" />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: '#0f172a' }}>Experiência Aprimorada</div>
                    <small className="text-muted" style={{ fontWeight: '500' }}>
                      Interface mais intuitiva e eficiente
                    </small>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                    }}
                  >
                    <Shield size={20} className="text-white" />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: '#0f172a' }}>Maior Controle</div>
                    <small className="text-muted" style={{ fontWeight: '500' }}>
                      Gestão completa dos investimentos
                    </small>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
                    }}
                  >
                    <Smartphone size={20} className="text-white" />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: '#0f172a' }}>Mobilidade</div>
                    <small className="text-muted" style={{ fontWeight: '500' }}>
                      Acesso completo em qualquer dispositivo
                    </small>
                  </div>
                </div>
              </div>

              <Button 
                className="w-100"
                style={{ 
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '12px',
                  fontWeight: '700',
                  boxShadow: '0 8px 25px rgba(139,92,246,0.3)'
                }}
              >
                <Settings size={16} className="me-2" />
                Sugerir Melhoria
              </Button>
            </Card.Body>
          </Card>

          {/* Status de Desenvolvimento */}
          <Card className="border-0 shadow-lg" style={{ borderRadius: '24px' }}>
            <Card.Body className="p-4">
              <h6 className="mb-3" style={{ color: '#0f172a', fontWeight: '700' }}>
                Status do Desenvolvimento
              </h6>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
                    Funcionalidades Planejadas
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                    80%
                  </span>
                </div>
                <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px' }}>
                  <div 
                    style={{ 
                      width: '80%', 
                      height: '100%', 
                      background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                      borderRadius: '4px'
                    }}
                  ></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
                    Interface Design
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                    95%
                  </span>
                </div>
                <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px' }}>
                  <div 
                    style={{ 
                      width: '95%', 
                      height: '100%', 
                      background: 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)',
                      borderRadius: '4px'
                    }}
                  ></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
                    Integração Backend
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                    60%
                  </span>
                </div>
                <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px' }}>
                  <div 
                    style={{ 
                      width: '60%', 
                      height: '100%', 
                      background: 'linear-gradient(90deg, #f59e0b 0%, #f97316 100%)',
                      borderRadius: '4px'
                    }}
                  ></div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ConfiguracoesContent;
