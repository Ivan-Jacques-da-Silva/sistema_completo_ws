
import React, { useState } from 'react';
import { Card, Row, Col, Button, Badge } from 'react-bootstrap';
import { 
  BarChart3, 
  Eye, 
  TrendingUp, 
  Target, 
  Smartphone, 
  PieChart,
  Activity,
  DollarSign
} from 'lucide-react';

const PerformanceContent = () => {
  const [activeChart, setActiveChart] = useState('roi');

  // Dados simulados
  const unidades = [
    { id: 1, nome: 'Sala 1308', roi: 58, valorAtual: 1450000 },
    { id: 2, nome: 'Sala 1205', roi: 55, valorAtual: 1320000 },
    { id: 3, nome: 'Sala 0907', roi: 48, valorAtual: 1180000 }
  ];

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
            Benefícios para o Investidor
          </h1>
          <p className="text-muted mb-0" style={{ fontSize: '16px', fontWeight: '500' }}>
            Wall Street Corporate
          </p>
        </div>
      </div>

      <Row>
        {/* Seção Principal */}
        <Col lg={8} className="mb-4">
          {/* Features de Benefícios */}
          <Card className="border-0 shadow-lg mb-4" style={{ borderRadius: '24px' }}>
            <Card.Body className="p-5">
              <Row>
                <Col lg={6} className="mb-4">
                  <h4 style={{ color: '#3b82f6', fontWeight: '700', marginBottom: '20px' }}>
                    Facilita a Tomada de Decisão
                  </h4>
                  
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: '32px',
                          height: '32px',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        }}
                      >
                        ✓
                      </div>
                      <span style={{ fontWeight: '600', color: '#0f172a', fontSize: '15px' }}>
                        Visão consolidada de todas as unidades
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: '32px',
                          height: '32px',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        }}
                      >
                        ✓
                      </div>
                      <span style={{ fontWeight: '600', color: '#0f172a', fontSize: '15px' }}>
                        ROI calculado automaticamente
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: '32px',
                          height: '32px',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        }}
                      >
                        ✓
                      </div>
                      <span style={{ fontWeight: '600', color: '#0f172a', fontSize: '15px' }}>
                        Comparativo com valores de mercado
                      </span>
                    </div>
                  </div>

                  <h4 style={{ color: '#f59e0b', fontWeight: '700', marginBottom: '20px' }}>
                    Gestão Simplificada
                  </h4>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: '32px',
                          height: '32px',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        }}
                      >
                        ✓
                      </div>
                      <span style={{ fontWeight: '600', color: '#0f172a', fontSize: '15px' }}>
                        Ações rápidas para venda/locação
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: '32px',
                          height: '32px',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        }}
                      >
                        ✓
                      </div>
                      <span style={{ fontWeight: '600', color: '#0f172a', fontSize: '15px' }}>
                        Status visual das unidades
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: '32px',
                          height: '32px',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        }}
                      >
                        ✓
                      </div>
                      <span style={{ fontWeight: '600', color: '#0f172a', fontSize: '15px' }}>
                        Histórico completo de operações
                      </span>
                    </div>
                  </div>

                  <h4 style={{ color: '#10b981', fontWeight: '700', marginBottom: '20px' }}>
                    Interface Profissional
                  </h4>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: '32px',
                          height: '32px',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        }}
                      >
                        ✓
                      </div>
                      <span style={{ fontWeight: '600', color: '#0f172a', fontSize: '15px' }}>
                        Design moderno e responsivo
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: '32px',
                          height: '32px',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        }}
                      >
                        ✓
                      </div>
                      <span style={{ fontWeight: '600', color: '#0f172a', fontSize: '15px' }}>
                        Navegação intuitiva em qualquer dispositivo
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: '32px',
                          height: '32px',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        }}
                      >
                        ✓
                      </div>
                      <span style={{ fontWeight: '600', color: '#0f172a', fontSize: '15px' }}>
                        Foco nas métricas que importam
                      </span>
                    </div>
                  </div>
                </Col>

                <Col lg={6}>
                  {/* Painel Simulado */}
                  <div style={{ 
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    borderRadius: '20px',
                    padding: '20px',
                    border: '2px solid #e5e7eb'
                  }}>
                    <div className="mb-3" style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                      📊 Painel de gerenciamento imobiliário para investir em serviços de aluguel
                    </div>
                    
                    <div className="mb-3" style={{ fontSize: '12px', color: '#64748b' }}>
                      Principais métricas apresentadas de forma clara e visual
                    </div>

                    {/* Simulação de Gráficos */}
                    <div style={{ background: 'white', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>ROI Acumulado</div>
                          <div style={{ fontSize: '20px', fontWeight: '800', color: '#10b981' }}>$37,300</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>Crescimento mês</div>
                          <div style={{ fontSize: '16px', fontWeight: '700', color: '#10b981' }}>15%</div>
                        </div>
                      </div>
                      
                      {/* Gráfico de barras simulado */}
                      <div className="d-flex align-items-end gap-1" style={{ height: '60px' }}>
                        {[40, 55, 48, 62, 38, 45, 70, 58, 44, 52, 60, 65].map((height, index) => (
                          <div 
                            key={index}
                            style={{ 
                              width: '14px',
                              height: `${height}%`,
                              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              borderRadius: '2px'
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>

                    <Row>
                      <Col md={6}>
                        <div style={{ background: 'white', borderRadius: '12px', padding: '12px', marginBottom: '12px' }}>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>Revenue</div>
                          <div style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>$5,375,200</div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div style={{ background: 'white', borderRadius: '12px', padding: '12px', marginBottom: '12px' }}>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>Total Rent</div>
                          <div style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>$1,840,700</div>
                        </div>
                      </Col>
                    </Row>

                    <div style={{ background: 'white', borderRadius: '12px', padding: '16px' }}>
                      <div className="d-flex align-items-center gap-3">
                        <div 
                          style={{ 
                            width: '60px', 
                            height: '60px', 
                            borderRadius: '50%',
                            background: 'conic-gradient(from 0deg, #10b981 0% 60%, #e5e7eb 60% 100%)',
                            position: 'relative'
                          }}
                        >
                          <div 
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              background: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '10px',
                              fontWeight: '700'
                            }}
                          >
                            60%
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>Occupancy Rate</div>
                          <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>4.5%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Desempenho das Unidades */}
        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-lg" style={{ borderRadius: '24px' }}>
            <Card.Body className="p-4">
              <h5 className="mb-4" style={{ color: '#0f172a', fontWeight: '700' }}>
                Desempenho das Unidades
              </h5>
              
              {/* Gráfico de Barras ROI */}
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <div 
                    style={{ 
                      width: '16px', 
                      height: '16px', 
                      borderRadius: '4px', 
                      background: '#10b981',
                      marginRight: '8px' 
                    }}
                  ></div>
                  <span style={{ fontWeight: '600', color: '#0f172a' }}>ROI (%)</span>
                </div>

                <div style={{ height: '200px', position: 'relative' }}>
                  {/* Eixo Y */}
                  <div style={{ position: 'absolute', left: '0', top: '0', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                    <span>60</span>
                    <span>50</span>
                    <span>40</span>
                    <span>30</span>
                    <span>20</span>
                    <span>10</span>
                    <span>0</span>
                  </div>

                  {/* Área do Gráfico */}
                  <div style={{ marginLeft: '30px', height: '100%', display: 'flex', alignItems: 'end', gap: '20px' }}>
                    {unidades.map((unidade, index) => (
                      <div key={unidade.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div 
                          style={{ 
                            width: '100%',
                            height: `${(unidade.roi / 60) * 100}%`,
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            borderRadius: '8px 8px 0 0',
                            minHeight: '20px',
                            marginBottom: '8px',
                            boxShadow: '0 4px 12px rgba(16,185,129,0.3)'
                          }}
                        ></div>
                        <div style={{ fontSize: '10px', fontWeight: '700', color: '#0f172a', textAlign: 'center', transform: 'rotate(-10deg)' }}>
                          {unidade.nome}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lista de Unidades */}
              <div>
                {unidades.map((unidade) => (
                  <div key={unidade.id} className="d-flex justify-content-between align-items-center mb-3 p-3 rounded-3" style={{ backgroundColor: '#f8fafc' }}>
                    <div>
                      <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>
                        {unidade.nome}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        R$ {unidade.valorAtual.toLocaleString('pt-BR')}
                      </div>
                    </div>
                    <div className="text-end">
                      <Badge 
                        style={{ 
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          fontSize: '12px',
                          borderRadius: '12px'
                        }}
                      >
                        {unidade.roi}% ROI
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botão de Ação */}
              <Button 
                className="w-100 mt-3"
                style={{ 
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '12px',
                  fontWeight: '700'
                }}
              >
                <BarChart3 size={16} className="me-2" />
                Ver Relatório Completo
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PerformanceContent;
