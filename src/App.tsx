import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './paginas/login/Login';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import './App.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store/store';
import ListaFornecedor from './componentes/fornecedor/listafornecedor/ListaFornecedor';
import ListaProduto from './componentes/produto/listaproduto/ListaProduto';
import CadastroProduto from './componentes/produto/cadastroproduto/CadastroProduto';
import CadastroFornecedor from './componentes/fornecedor/cadastrarfornecedor/CadastroFornecedor';
import DeletarProduto from './componentes/produto/deletarproduto/DeletarProduto';
import DeletarFornecedor from './componentes/fornecedor/deletarfornecedor/DeletarFornecedor';
import Navbar from './componentes/estaticos/navbar/Navbar';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
      <Navbar />
        <div style={{ minHeight: '100vh' }}>
          <Routes> // Antigo Switch
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<CadastroUsuario />} />
            <Route path="/fornecedor" element={<ListaFornecedor />} />
            <Route path="/produto" element={<ListaProduto />} />
            <Route path="/formularioproduto" element={<CadastroProduto />} />
            <Route path="/formularioproduto/:id" element={<CadastroProduto />} />
            <Route path="/formulariofornecedor" element={<CadastroFornecedor />} />
            <Route path="/formulariofornecedor/:id" element={<CadastroFornecedor />} />
            <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
            <Route path="/deletarfornecedor/:id" element={< DeletarFornecedor />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
