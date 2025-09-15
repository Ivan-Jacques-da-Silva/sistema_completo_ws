// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Páginas
import Home from './pages/Home.jsx';
import Andares from './pages/Andares.jsx';
import Painel from './pages/Painel.jsx';
import Login from './pages/Login.jsx';
import AcessoNegado from './pages/AcessoNegado.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CheckoutSucesso from './pages/CheckoutSucesso.jsx';
import CheckoutCancelado from './pages/CheckoutCancelado.jsx';
import LoginMembro from './pages/LoginMembro'
import AreaMembro from './pages/AreaMembro'
import ProtectedRouteMembro from './components/ProtectedRouteMembro'

function App() {
  return (
    <Router>
      <div className="w-100" style={{ backgroundColor: '#0e0e15' }}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/andares" element={<Andares />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><Painel /></ProtectedRoute>} />
          <Route path="/painel" element={<ProtectedRoute><Painel /></ProtectedRoute>} />
          <Route path="/acesso-negado" element={<AcessoNegado />} />
          <Route path="/sucesso" element={<CheckoutSucesso />} />
          <Route path="/cancelado" element={<CheckoutCancelado />} />
          <Route path="/login-membro" element={<LoginMembro />} />
          <Route path="/area-membro" element={
            <ProtectedRouteMembro>
              <AreaMembro />
            </ProtectedRouteMembro>
          } />
        </Routes>

      </div>
    </Router>
  );
}

export default App;