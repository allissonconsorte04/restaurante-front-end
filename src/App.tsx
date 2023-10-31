import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Produtos from './pages/produtos/Produtos';
import Footer from './components/footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="group-content">
        <Navbar />
        <Routes>
          <Route path="/produtos" element={<Produtos />} />
          {/* Outras rotas podem ser definidas aqui */}
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
