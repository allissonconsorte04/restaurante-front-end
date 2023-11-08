import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Produtos from './pages/produtos/Produtos';
import Footer from './components/footer/Footer';
import Clientes from './pages/clientes/Clientes';

function App() {
  return (
    <BrowserRouter>
      <div className="group-content">
        <Navbar />
        <Routes>
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/clientes" element={<Clientes />} />
          {/* Outras rotas podem ser definidas aqui */}
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
