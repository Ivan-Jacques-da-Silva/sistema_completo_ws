
import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { FileText, Download } from 'lucide-react';

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

export default DocumentosContent;
