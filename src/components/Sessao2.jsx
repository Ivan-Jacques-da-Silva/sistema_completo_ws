import React from 'react';

import imgPredio from '../img/imgS2.webp';
import imgMockup from '../img/mockupTelasSistemas.png';
import fundoSessao2 from '../img/fundoSessao2.webp';
import icone1 from '../img/icone1.webp';
import icone2 from '../img/icone2.webp';
import icone3 from '../img/icone3.webp';
import icone4 from '../img/icone4.webp';
import icone5 from '../img/icone5.webp';
import icone6 from '../img/icone6.webp';
import icone7 from '../img/icone7.webp';
import icone8 from '../img/icone8.webp';
import iconeMarca from '../img/iconeMarca.webp';

function Sessao2() {
  return (
    <section
      className="py-5"
      style={{
        // backgroundImage: `url(${fundoSessao2})`,
        backgroundColor: '#010329',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
      }}
    >
      <div className="container">
        <div className="row g-4 mb-1 mt-5 align-items-center">
          {/* Coluna esquerda */}
          <div className="col-md-6 d-flex justify-content-md-end justify-content-center mb-3 mb-md-0">


            <div
              className="px-3 d-flex flex-column justify-content-center"
              style={{
                width: '440px',
                height: '320px',
                border: '2px solid #FFAB52',
                borderRadius: '16px',
                padding: '30px',
              }}
            >
              <img src={iconeMarca} alt="Marca" style={{ width: '100%', marginBottom: '20px' }} />
              <h2
                className="mb-0"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '44px',
                  lineHeight: '1.2',
                  color: '#fff',
                }}
              >
                <strong style={{ display: 'block' }}>O melhor prédio</strong>
                <span style={{ fontWeight: 300 }}>comercial de <br /> Chapecó - SC</span>
              </h2>
            </div>
          </div>


          {/* Coluna direita */}
          <div className="col-md-6 d-flex justify-content-md-start justify-content-center mb-3 mb-md-0">


            <div
              className="px-3 d-flex flex-column justify-content-center"

              style={{
                width: '440px',
                height: '320px',
                border: '2px solid #FFAB52',
                borderRadius: '16px',
                padding: '30px',
              }}
            >
              <div className="row row-cols-2 g-3">
                {[
                  [icone2, '120 salas de 54 a 78m²'],
                  [icone3, '30 garagens rotativas'],
                  [icone4, 'Port-chochère com pista dupla'],
                  [icone5, 'Pub Executivo'],
                  [icone6, '2 Salões Gourmets'],
                  [icone7, 'Espaço descompressão'],
                  [icone8, 'Conceito internacional'],
                  [icone1, 'Alto potencial de valorização'],
                ].map(([icone, texto], i) => (
                  <div key={i} className="col d-flex align-items-start gap-2">
                    <img src={icone} alt={`Ícone ${i + 1}`} style={{ width: '30px' }} />
                    <span
                      style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 300,
                        fontSize: '16px',
                        lineHeight: '130%',
                        color: '#fff',
                      }}
                    >
                      {texto}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Imagem do prédio */}
        {/* <div className="text-center" style={{ paddingTop: '80px' }}>
          <img
            src={imgPredio}
            alt="Prédio"
            className="img-fluid mb-5"
            style={{
              // border: '2px solid #FFAB52',
              borderRadius: '16px',
              maxWidth: '100%',
            }}
          />
        </div> */}

        <div className="text-center" style={{ paddingTop: '80px' }}>
          <iframe
            src="https://tour360.meupasseiovirtual.com/067962/278515/tourvirtual/index.html"
            width="100%"
            height="600"
            style={{
              border: '2px solid #FFAB52',
              borderRadius: '16px',
              maxWidth: '100%',
              marginBottom: "70px",
            }}
            allowFullScreen
          />
        </div>

        {/* Botão */}
        <div className="text-center" style={{ marginTop: '-25px', marginBottom: '20px' }}>


          <a
            href="https://front.wallstreetnr.com.br/proposta-wall-street.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 d-inline-block"
            style={{
              backgroundColor: '#fff',
              color: '#001A47',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            Baixe o memorial descritivo
          </a>


        </div>
      </div>
    </section>
  );
}

export default Sessao2;
