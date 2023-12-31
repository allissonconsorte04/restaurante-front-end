import { useEffect, useState } from 'react';

import './pedidos.css'; // Certifique-se de ter o arquivo de estilo adequado
import ModalPedidos from '../../components/modal/ModalPedidos';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCheck } from '@fortawesome/free-solid-svg-icons';
import ModalItensPedido from '../../components/modal/ModalItensPedido';
import api from '../../services/api';
import ModalFecharConta from '../../components/modal/ModalFecharConta';

interface Pedido {
  id?: number;
  cliente_nome: string;
  status: string;
  data: Date;
  valor_total: number;
}



const Pedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isNewModalVisible, setNewModalVisible] = useState(false);
  const [isModalFecharContaVisible, setModalFecharContaVisible] =
    useState(false);
  const [pedidoParaEditar, setPedidoParaEditar] = useState<Pedido | null>(null);

  useEffect(() => {
    getAllPedidos();
  }, []);

  const getAllPedidos = () => {
    api
      .get('/pedidos')
      .then((response) => {
        setPedidos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter pedidos:', error);
      });
  };

  const handleEditarPedido = (pedido: Pedido) => {
    setPedidoParaEditar(pedido);
    setModalVisible(true);
  };

  const handleNewPedido = (pedido: Pedido) => {
    setPedidoParaEditar(pedido);
    setNewModalVisible(true);
  };

  const handleFecharConta = (pedido: Pedido) => {
    setPedidoParaEditar(pedido);
    setModalFecharContaVisible(true);
  };

  const fecharModal = () => {
    setModalFecharContaVisible(false);
    setNewModalVisible(false);
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
            handleNewPedido({
              cliente_nome: '',
              status: '',
              data: new Date(),
              valor_total: 0,
            })
          }
        >
          Novo Pedido +
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
              <td>{`R$ ${Number(pedido.valor_total).toFixed(2)}`}</td>
              <td className="actions-columns">
                <div style={{ justifyContent: 'center', display: 'flex' }}>
                  <button
                    className="btn-edit btn"
                    onClick={() => handleFecharConta(pedido)}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button
                    className="btn-edit btn"
                    onClick={() => handleEditarPedido(pedido)}
                  >
                    <FontAwesomeIcon icon={faAdd} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isNewModalVisible && (
        <ModalPedidos pedidoData={pedidoParaEditar} fecharModal={fecharModal} />
      )}
      {isModalVisible && (
        <ModalItensPedido
          pedidoId={pedidoParaEditar?.id}
          fecharModal={fecharModal}
        />
      )}
      {isModalFecharContaVisible && (
        <ModalFecharConta
        pedidoId={pedidoParaEditar?.id}
          fecharModal={fecharModal}
        />
      )}
    </div>
  );
};

export default Pedidos;
