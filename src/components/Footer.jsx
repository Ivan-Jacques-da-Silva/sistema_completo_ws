import React from 'react';
import imagemFundoFooter from '../img/footer.webp';
import logoFooter from '../img/logoFooter.webp';

function Rodape() {
  return (
    <footer>
      {/* Parte de cima com imagem de fundo */}
      <div
        style={{
          background: `url(${imagemFundoFooter}) center/cover no-repeat`,
          paddingTop: '170px',
          paddingBottom: '170px',
        }}
      >
        <div className="container text-white">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <img
                src={logoFooter}
                alt="Wall Street Corporate"
                style={{ maxWidth: '220px' }}
              />

              {/* Linha */}
              <div
                style={{
                  width: '180px',
                  height: '2px',
                  backgroundColor: '#FFAB52',
                  margin: '30px 0',
                }}
              />

              {/* Endereço */}
              <p className="mb-1">Av. Nereu Ramos, 386 - Centro - Chapecó</p>
              <p className="mb-1">Santa Catarina - Brasil</p>
              <p className="mb-4">CEP: 89802-411</p>

              {/* Botão */}
              <button
                style={{
                  backgroundColor: '#fff',
                  color: '#001A47',
                  border: '3px solid #001A47',
                  borderRadius: '4px',
                  padding: '10px 20px',
                  fontWeight: 'bold',
                }}
              >
                Entrar em contato
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Barra preta inferior */}
      <div style={{ backgroundColor: '#000', padding: '25px 0' }}>
        <div className="container text-center text-white">
          <small>Todos os direitos 2025 © Wall Street | Política de privacidade</small>
        </div>
      </div>
    </footer>
  );
}

export default Rodape;
