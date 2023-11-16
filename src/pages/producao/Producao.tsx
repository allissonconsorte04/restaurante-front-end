import React, { useEffect, useState } from 'react';

import './producao.css'; // Certifique-se de ter o arquivo de estilo adequado

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import api from '../../services/api';

interface ProdutoAProduzir {
  nome_produto: string;
  pedido_id: number;
  quantidade: number;
  finished: boolean;
}

const Producao = () => {
  const [produtosAProduzir, setProdutosAProduzir] = useState<ProdutoAProduzir[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [produtoParaEditar, setProdutoParaEditar] = useState<ProdutoAProduzir | null>(null);

  useEffect(() => {
    getProdutosAProduzir();
  }, []);

  const getProdutosAProduzir = () => {
    api
      .get('/pedidos/produtos-a-produzir')
      .then((response) => {
        console.log('produtos-a-produzir', response.data)
        setProdutosAProduzir(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter produtos a produzir:', error);
      });
  };

  const handleEditarProduto = (produto: ProdutoAProduzir) => {
    setProdutoParaEditar(produto);
    setModalVisible(true);
  };

  const handleMarcarComoConcluido = (produto: ProdutoAProduzir) => {
    // Lógica para marcar o produto como concluído no backend
    // ...

    // Atualiza a lista após marcar como concluído
    getProdutosAProduzir();
  };

  const fecharModal = () => {
    setModalVisible(false);
    setProdutoParaEditar(null);
    getProdutosAProduzir();
  };

  return (
    <div className="producao-container">
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Pedido ID</th>
            <th>Quantidade</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {produtosAProduzir.map((produto) => (
            <tr key={produto.pedido_id}>
              <td>{produto.nome_produto}</td>
              <td>{produto.pedido_id}</td>
              <td>{produto.quantidade}</td>
              <td>{produto.finished ? 'Concluído' : 'Pendente'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Producao