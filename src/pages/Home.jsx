// src/pages/Home.jsx
import React from 'react';
import Sessao1 from '../components/Sessao1.jsx';
import Sessao2 from '../components/Sessao2.jsx';
import Sessao3 from '../components/Sessao3.jsx';
import Cabecalho from '../components/Cabecalho.jsx';
import Footer from '../components/Footer.jsx';

function Home() {
  return (
    <>
      <Cabecalho />
      <Sessao1 />
      <Sessao2 />
      <Sessao3 />
      <Footer />
    </>
  );
}

export default Home;
