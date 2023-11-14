import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './pedidos.css'; // Certifique-se de ter o arquivo de estilo adequado
import ModalPedidos from '../../components/modal/ModalPedidos';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface Pedido {
  id?: number;
  cliente_nome: string;
  status: string;
  data: Date;
  total: number;
}

const Pedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [pedidoParaEditar, setPedidoParaEditar] = useState<Pedido | null>(
    null
  );

  useEffect(() => {
    getAllPedidos();
    console.log(pedidos);
  }, []);

  const getAllPedidos = () => {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .get('http://localhost:3000/api/pedidos/', {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          console.log('response: ', response.data);
          setPedidos(response.data);
        })
        .catch((error) => {
          console.error('Erro ao obter pedidos:', error);
        });
    }
  };

  const handleEditarPedido = (pedido: Pedido) => {
    setPedidoParaEditar(pedido);
    setModalVisible(true);
  };

  const handleRemovePedido = (pedido: Pedido) => {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .delete(`http://localhost:3000/api/pedidos/${pedido.id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log('Pedido deletado: ', response.data);
          fecharModal();
        })
        .catch((error) => {
          console.error('Erro ao deletar pedido: ', error);
        });
    }
  };

  const fecharModal = () => {
    setModalVisible(false);
    setPedidoParaEditar(null);
    getAllPedidos();
  };

  const formatDate = (date: any) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <div className="pedidos-container">
      <div className="add-pedido-container">
        <button
          className="btn btn-add-pedido"
          onClick={() =>
            handleEditarPedido({
              cliente_nome: '',
              status: '',
              data: new Date(),
              total: 0,
            })
          }
        >
          Adicionar Pedido +
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Status</th>
            <th>Data</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td className="id-columns">{pedido.id}</td>
              <td>{pedido.cliente_nome}</td>
              <td>{pedido.status}</td>
              <td>{formatDate(pedido.data)}</td>
              <td>{`R$ ${Number(pedido.total).toFixed(2)}`}</td>
              <td className="actions-columns">
                <div style={{ justifyContent: 'center', display: 'flex' }}>
                  <button
                    className="btn-edit btn"
                    onClick={() => handleEditarPedido(pedido)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="btn btn-remove"
                    onClick={() => handleRemovePedido(pedido)}
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
        <ModalPedidos pedidoData={pedidoParaEditar} fecharModal={fecharModal} />
      )}
    </div>
  );
};

export default Pedidos;
