
import React from 'react';
import { Card } from 'react-bootstrap';
import { Bell } from 'lucide-react';

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

export default ComunicadosContent;
