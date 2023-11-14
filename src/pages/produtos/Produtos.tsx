import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './produtos.css'; // Certifique-se de ter o arquivo de estilo adequado
import ModalProdutos from '../../components/modal/ModalProdutos';

interface Produto {
  id?: number;
  nome: string;
  preco: number;
}

const Produtos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [produtoParaEditar, setProdutoParaEditar] = useState<Produto | null>(
    null
  );

  useEffect(() => {
    getAllProdutos();
  }, []);

  const getAllProdutos = () => {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .get('http://localhost:3000/api/produtos/', {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setProdutos(response.data);
        })
        .catch((error) => {
          console.error('Erro ao obter produtos:', error);
        });
    }
  };

  const handleEditarProduto = (produto: Produto) => {
    setProdutoParaEditar(produto);
    setModalVisible(true);
  };

  const handleRemoveProduto = (produto: Produto) => {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .delete(`http://localhost:3000/api/produtos/${produto.id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log('Produto deletado: ', response.data);
          fecharModal();
        })
        .catch((error) => {
          console.error('Erro ao deletar produto: ', error);
        });
    }
  };

  const fecharModal = () => {
    setModalVisible(false);
    setProdutoParaEditar(null);
    getAllProdutos();
  };

  return (
    <div className="produtos-container">
      <div className="add-produto-container">
        <button
          className="btn btn-add-produto"
          onClick={() => handleEditarProduto({ nome: '', preco: 0 })}
        >
          Adicionar Produto +
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.preco}</td>
              <td>
                <div style={{ justifyContent: 'center', display: 'flex' }}>
                  <button
                    className="btn-edit btn"
                    onClick={() => handleEditarProduto(produto)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                  className='btn btn-remove'
                    onClick={() => handleRemoveProduto(produto)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalVisible && (
        <ModalProdutos
          produtoData={produtoParaEditar}
          fecharModal={fecharModal}
        />
      )}
    </div>
  );
};

export default Produtos;
