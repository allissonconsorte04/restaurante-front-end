import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Produtos from './pages/produtos/Produtos';
import Clientes from './pages/clientes/Clientes';
import Funcionarios from './pages/funcionarios/Funcionarios';

function App() {
  return (
    <BrowserRouter>
      <div className="group-content">
        <Navbar />
        <Routes>
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path='/funcionarios' element={<Funcionarios />} />
          {/* Outras rotas podem ser definidas aqui */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
