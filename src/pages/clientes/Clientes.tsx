import React, { useEffect, useState } from 'react';

import './clientes.css';
import ModalClientes from '../../components/modal/ModalClientes';
import api from '../../services/api';

interface Cliente {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
}

const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [clienteParaEditar, setClienteParaEditar] = useState<Cliente | null>(
    null
  );

  useEffect(() => {
    getAllClientes();
  }, []);

  const getAllClientes = () => {
    api
      .get('/clientes')
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter clientes:', error);
      });
  };

  const handleEditarCliente = (cliente: Cliente) => {
    setClienteParaEditar(cliente);
    setModalVisible(true);
  };

  const handleRemoveCliente = (cliente: Cliente) => {
    api
      .delete(`/clientes/${cliente.id}`)
      .then((response) => {
        console.log('Cliente deletado: ', response.data);
        fecharModal();
      })
      .catch((error) => {
        console.error('Erro ao deletar cliente: ', error);
      });
  };

  const fecharModal = () => {
    setModalVisible(false);
    setClienteParaEditar(null);
    getAllClientes();
  };

  return (
    <div className="clientes-container">
      <div className="add-cliente-container">
        <button
          className="btn btn-add-cliente"
          onClick={() =>
            handleEditarCliente({ nome: '', email: '', telefone: '' })
          }
        >
          Adicionar Cliente +
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
              <td>
                <div style={{ justifyContent: 'center', display: 'flex' }}>
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEditarCliente(cliente)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-remove"
                    onClick={() => handleRemoveCliente(cliente)}
                  >
                    Remover
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalVisible && (
        <ModalClientes
          clienteData={clienteParaEditar}
          fecharModal={fecharModal}
        />
      )}
    </div>
  );
};

export default Clientes;
