import React from 'react';
import imgMockup from '../img/mockupTelasSistemas.png';

function Sessao3() {
  return (
    <section style={{ backgroundColor: '#0e0e15', margin: "115px 0 80px 0" }}>
      <div className="container text-center text-white">
        <h2 style={{ fontSize: '2.5rem' }}>
          <span style={{ fontWeight: 300 }}>Navegue em </span>
          <strong>nosso sistema!</strong>
        </h2>

        {/* Imagem do makup */}
        <div className="text-center" >
          <img
            src={imgMockup}
            alt="Mockup"
            style={{
              width: '100%',
              maxWidth: '900px',
              height: 'auto'
            }}
          />
        </div>

        <div className="">
          <a
            href="https://front.wallstreetnr.com.br/andares?andar=19"
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
            Clique aqui
          </a>

        </div>
      </div>
    </section>
  );
}

export default Sessao3;
