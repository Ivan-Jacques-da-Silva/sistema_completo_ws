// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Páginas
import Home from './pages/Home.jsx';
import Andares from './pages/Andares.jsx'; 
import Painel from './pages/Painel.jsx';
// import Sobre from './pages/Sobre.jsx';
// import Contato from './pages/Contato.jsx';
import Login from './pages/Login.jsx';
import AcessoNegado from './pages/AcessoNegado.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CheckoutSucesso from './pages/CheckoutSucesso.jsx';
import CheckoutCancelado from './pages/CheckoutCancelado.jsx';

function App() {
  return (
    <Router>
      <div className="w-100" style={{ backgroundColor: '#0e0e15' }}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/andares" element={<Andares />} />
          {/* <Route path="/painel" element={<Painel />} /> */}
          {/* <Route path="/sobre" element={<Sobre />} /> */}
          {/* <Route path="/contato" element={<Contato />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><Painel /></ProtectedRoute>} />
          <Route path="/painel" element={<ProtectedRoute><Painel /></ProtectedRoute>} />
          <Route path="/acesso-negado" element={<AcessoNegado />} />
          <Route path="/sucesso" element={<CheckoutSucesso />} />
          <Route path="/cancelado" element={<CheckoutCancelado />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;