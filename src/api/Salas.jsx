import React from 'react';
import Config from '../Config';
import { Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

const Salas = ({
  salas,
  salaSelecionada,
  setSalaSelecionada,
  larguraTela,
  andarSelecionado,
  salasCom,
  setMostrarProposta
}) => {
  const renderDisponibilidade = (andar, numero) => {
    const andarNumero = parseInt(andar);
    const numeroSalaCompleto = parseInt(`${andarNumero}${numero.toString().padStart(2, '0')}`);
    return salasCom.includes(numeroSalaCompleto);
  };

  if (!salas || salas.length === 0) {
    return (
      <div className="text-center p-4">
        <i className="bi bi-building text-muted" style={{fontSize: '3rem'}}></i>
        <h5 className="mt-3 text-muted">Nenhuma sala disponível</h5>
        <p className="text-muted">
          Não há salas cadastradas para este andar.
        </p>
      </div>
    );
  }

  if (larguraTela < 1200) {
    return (
      <>
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: '3px' }}>
          <div style={{ display: 'inline-flex', padding: '0 10px' }}>
            {salas.map((sala, index) => {
              const numero = index + 1;
              const nome = sala.atributos?.nome?.[0]?.valor || `Sala ${numero}`;
              const area = sala.atributos?.area?.[0]?.valor || '-';
              const posicao = sala.atributos?.posicao?.[0]?.valor || '';
              const preco = parseFloat(sala.precos?.de?.[0]?.valor || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
              const imagem = sala.arquivos?.imagens?.[0]?.baixar;
              const disponivel = sala.atributos?.disponibilidade?.[0]?.valor;

              return (
                <div
                  key={index}
                  className={`rounded-4 p-2 mx-1 position-relative ${numero === salaSelecionada ? 'border-dark border-2' : 'border-secondary'}`}
                  style={{
                    background: 'rgb(243 245 249)',
                    cursor: 'pointer',
                    border: '1px solid #0046AD',
                    width: '220px',
                    flexShrink: 0
                  }}
                  onClick={() => {
                    setSalaSelecionada(numero);
                    setMostrarProposta(false);
                  }}
                >
                  <div className="position-relative">
                    <img
                      src={imagem ? `${Config.api_url}${imagem}` : '/placeholder-image.png'}
                      alt={nome}
                      className="w-100 rounded mb-2"
                      style={{ width: '200px', objectFit: 'cover' }}
                    />
                    <i
                      className={`bi fs-5 ${disponivel ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'}`}
                      style={{ 
                        position: 'absolute', 
                        top: larguraTela >= 1200 ? '10px' : 'auto',
                        bottom: larguraTela >= 1200 ? 'auto' : '-101px',
                        right: '10px' 
                      }}
                    />
                  </div>
                  <div className="text-start">
                    <div className="fw-bold">{nome}</div>
                    <div className="text-uppercase small text-muted">{posicao}</div>
                    <div className="fw-medium mt-1 mb-1">{area} m²</div>
                    <div className="fw-bold mb-1">R$ {preco}</div>
                    <hr className="my-2" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="d-flex justify-content-center mt-2">
            {salas.map((_, i) => (
              <div key={i} style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: salaSelecionada === i + 1 ? '#0046AD' : '#ccc',
                margin: '0px 4px'
              }} />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Row
        key={andarSelecionado}
        as={motion.div}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.6rem',
          marginBottom: '10px',
          justifyContent: 'center',
        }}
      >
        {salas.map((sala, index) => {
          const numero = index + 1;
          const nome = sala.atributos?.nome?.[0]?.valor || `Sala ${numero}`;
          const area = sala.atributos?.area?.[0]?.valor || '-';
          const posicao = sala.atributos?.posicao?.[0]?.valor || '';
          const preco = parseFloat(sala.precos?.de?.[0]?.valor || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
          const imagem = sala.arquivos?.imagens?.[0]?.baixar;
          const disponivel = sala.atributos?.disponibilidade?.[0]?.valor;

          return (
            <Col
              key={index}
              as={motion.div}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ width: '220px', flex: '0 0 auto', padding: 0 }}
            >
              <div
                className={`rounded-3 p-1 h-100 position-relative ${numero === salaSelecionada ? 'border-dark border-2' : 'border-secondary'}`}
                style={{
                  background: 'rgb(243 245 249)',
                  cursor: 'pointer',
                  border: '1px solid #0046AD',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onClick={() => {
                  setSalaSelecionada(numero);
                  setMostrarProposta(false);
                }}
              >
                <div className="position-relative mb-2">
                  <img
                    src={imagem ? `${Config.api_url}${imagem}` : '/placeholder-image.png'}
                    alt={nome}
                    className="w-100 rounded"
                    style={{ height: '110px', objectFit: 'cover' }}
                  />
                  <i
                    className={`bi fs-6 ${disponivel ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'}`}
                    style={{ 
                      position: 'absolute', 
                      bottom: '-10px',
                      right: '8px',
                      background: 'white',
                      borderRadius: '50%',
                      padding: '1px',
                      lineHeight: '1'
                    }}
                  />
                </div>
                <div className="text-start flex-grow-1 d-flex flex-column px-1 pb-1">
                  <div className="fw-bold" style={{ fontSize: '14px' }}>{nome}</div>
                  <div className="text-uppercase text-muted" style={{ fontSize: '11px' }}>{posicao}</div>
                  <div className="fw-medium mt-1 mb-1" style={{ fontSize: '13px' }}>{area} m²</div>
                  <div className="fw-bold mt-auto mb-1" style={{ fontSize: '14px' }}>R$ {preco}</div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </AnimatePresence>
  );
};

export default Salas;