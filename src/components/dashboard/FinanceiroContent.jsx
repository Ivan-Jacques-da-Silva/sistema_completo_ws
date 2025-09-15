
import React from 'react';
import { Card } from 'react-bootstrap';
import { CreditCard } from 'lucide-react';

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

export default FinanceiroContent;
