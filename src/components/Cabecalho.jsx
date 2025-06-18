import React from 'react';
import logo from '../img/favicon.png';

function Cabecalho() {
  return (
    <>
      <header
        className="w-100 py-3"
        style={{
          backgroundColor: 'rgba(14, 14, 21, 0.4)', // reduzindo a opacidade para efeito de vidro
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)', // compatibilidade Safari
          position: 'fixed',
          top: 0,
          zIndex: 1000,
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          {/* <img src={logo} alt="Logo" style={{ height: '40px' }} /> */}
          <div style={{ height: '40px' }}></div>
          <div className="d-flex align-items-center gap-2">
            {/* <button
              className="btn text-white px-4 py-1"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '30px',
                backgroundColor: 'transparent',
                // fontWeight: 'bold',
                height:"40px",
              }}
            >
              MENU
            </button>
            <button
              className="btn text-white p-2 d-flex align-items-center justify-content-center"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '50%',
                backgroundColor: 'transparent',
                width: '40px',
                height: '40px',
              }}
            >
              <i className="bi bi-list fs-5"></i>
            </button> */}
          </div>

        </div>
      </header>
      {/* Espaço para compensar o header fixo */}
      <div style={{ height: '70px' }}></div>
    </>
  );
}

export default Cabecalho;
