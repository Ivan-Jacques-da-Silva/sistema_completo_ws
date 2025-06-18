import React from 'react';
import { Button } from 'react-bootstrap';
import logoCompleto from '../img/logo.png';
import fundoHeader from '../img/fundoHeader.webp';
import predio1 from '../img/predio1.png';
import iconeCirculo from '../img/iconeCirculo.webp';
import './sessoes.css';

function Sessao1() {

  const posicoesAndares = [
    { andar: 19, top: 70 },
    { andar: 18, top: 95 },
    { andar: 17, top: 120 },
    { andar: 16, top: 146 },
    { andar: 15, top: 173 },
    { andar: 14, top: 201 },
    { andar: 13, top: 230 },
    { andar: 12, top: 260 },
    { andar: 11, top: 288 },
    { andar: 10, top: 319 },
    { andar: 9, top: 350 },
    { andar: 8, top: 384 },
    { andar: 7, top: 417 },
    { andar: 6, top: 448 },
    { andar: 5, top: 491 },
  ];

  return (
    <section
      className="position-relative text-white pb-0 pt-md-5 pt-5"
      style={{
        width: '100%',
        height: 'auto',
        overflow: 'hidden',
        marginBottom: '0',
        marginTop: '-70px',
      }}
    >

      <div
        style={{
          backgroundImage: `url(${fundoHeader})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)',
          opacity: 0.3,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          paddingTop: '40px',
          zIndex: 1,
        }}
      ></div>

      <div
        style={{
          backgroundColor: '#001A47',
          mixBlendMode: 'overlay',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
        }}
      ></div>

      <div className="container " style={{ position: 'relative', zIndex: 3 }}>
        <div className="row ">
          <div className="col-md-6 d-flex flex-column justify-content-center  align-items-center text-md-start text-center">
            <div className="mb-md-5 mb-0">
              <img
                src={logoCompleto}
                alt="Wall Street Corporate"
                className="logo-header"
              />
            </div>


            {/* TEXTO DESKTOP */}
            <div className="d-none d-md-flex flex-column text-white" style={{ marginTop: '130px' }}>
              <div style={{ fontSize: '28px', fontWeight: 300 }}>
                Escolha seu Andar → Veja as Salas Disponíveis
              </div>
              <div style={{ fontSize: '28px', fontWeight: 300 }}>
                Acesse os Valores → Veja a Rentabilidade
              </div>
            </div>

            {/* TEXTO MOBILE */}
            <div className="d-flex d-md-none flex-column text-white text-center" style={{ marginTop: '40px', fontSize: '20px', fontWeight: 300 }}>
              <div>Escolha seu Andar</div>
              <div>Veja as Salas Disponíveis</div>
              <div style={{ marginTop: '10px' }}>Acesse os Valores</div>
              <div>Veja a Rentabilidade</div>
            </div>

            <div className="d-flex flex-column align-items-center mt-md-5 mt-3">
              <Button
                as="a"
                href="https://front.wallstreetnr.com.br/andares?andar=19"
                style={{
                  backgroundColor: '#fff',
                  border: 'none',
                  color: '#001A47',
                  marginBottom: '10px',
                  borderRadius: '4px'
                }}
                className="fw-bold px-4 py-2"
              >
                Escolha seu andar
              </Button>

              <Button
                as="a"
                href="https://front.wallstreetnr.com.br/folder-wall-street-corporate.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#fff',
                  border: 'none',
                  color: '#001A47',
                  borderRadius: '4px'
                }}
                className="fw-bold px-4 py-2"
              >
                Baixar PDF
              </Button>

              <div style={{
                marginTop: '50px',
                fontWeight: 300,
                fontSize: '36px',
                color: '#FFF'
              }}>
                75% VENDIDO
              </div>
            </div>


          </div>


          <div className="col-md-6 p-0 mt-5 d-flex align-items-end justify-content-md-start justify-content-center mb-md-0 mb-0">
            <div className="predio-container">
              <img src={predio1} alt="Prédio" style={{ width: '280px', height: '730px' }} />

              {posicoesAndares.map(({ andar, top }) => (
                <React.Fragment key={andar}>
                  <div style={{ position: 'absolute', top: `${top}px`, left: '120px' }}>
                    <button
                      className="botao-andar"
                      title={`${andar}º Andar`}
                      onClick={() => window.location.href = `/andares?andar=${andar}`}
                    >
                      <img src={iconeCirculo} alt={`${andar}º Andar`} className="icone-animado" />
                    </button>
                  </div>
                  <div className="d-flex" style={{
                    position: 'absolute',
                    top: `${top + 10}px`,
                    left: '155px', // um pouco antes da linha
                    width: '9px',
                    height: '9px',
                    backgroundColor: '#FF8C00',
                    borderRadius: '50%'
                  }}></div>
                  <div className="d-flex linha-andares" style={{
                    position: 'absolute',
                    top: `${top + 14}px`,
                    left: '160px',
                    // width: '190px',
                    // height: '1px',
                    backgroundColor: '#FF8C00',
                    borderRadius: '2px'
                  }}></div>

                  <div className="d-flex linha-andares-texto" style={{
                    position: 'absolute',
                    top: `${top - 5}px`,
                    // left: '360px',
                    fontWeight: 300,
                    whiteSpace: 'nowrap'
                  }}>
                    {/* {andar}º Andar{andar === 5 ? ' – Pavimento Prime' : ''} */}
                    {andar}º Andar{andar === 5 ? <><br />Pavimento <br /> Prime</> : ''}


                  </div>
                </React.Fragment>
              ))}

              <div
                className="bem-vindo-mobile"
                style={{
                  position: 'absolute',
                  bottom: '100px',
                  right: '-280px',
                  fontWeight: '500',
                  fontSize: '26px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#fff'
                }}>
                BEM VINDO AO NOVO!
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}

export default Sessao1;
