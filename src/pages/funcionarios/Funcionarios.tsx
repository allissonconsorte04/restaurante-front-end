import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './funcionarios.css'; // Certifique-se de ter o arquivo de estilo adequado
import ModalFuncionarios from '../../components/modal/ModalFuncionarios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface Funcionario {
  id?: number;
  nome: string;
  cargo: string;
  salario: number;
}

const Funcionarios = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [funcionarioParaEditar, setFuncionarioParaEditar] = useState<Funcionario | null>(
    null
  );

  useEffect(() => {
    getAllFuncionarios();
  }, []);

  const getAllFuncionarios = () => {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .get('http://localhost:3000/api/funcionarios/', {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setFuncionarios(response.data);
        })
        .catch((error) => {
          console.error('Erro ao obter funcionários:', error);
        });
    }
  };

  const handleEditarFuncionario = (funcionario: Funcionario) => {
    setFuncionarioParaEditar(funcionario);
    setModalVisible(true);
  };

  const handleRemoveFuncionario = (funcionario: Funcionario) => {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .delete(`http://localhost:3000/api/funcionarios/${funcionario.id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log('Funcionário deletado: ', response.data);
          fecharModal();
        })
        .catch((error) => {
          console.error('Erro ao deletar funcionário: ', error);
        });
    }
  };

  const fecharModal = () => {
    setModalVisible(false);
    setFuncionarioParaEditar(null);
    getAllFuncionarios();
  };

  return (
    <div className="funcionarios-container">
      <div className="add-funcionario-container">
        <button
          className="btn btn-add-funcionario"
          onClick={() =>
            handleEditarFuncionario({ nome: '', cargo: '', salario: 0 })
          }
        >
          Adicionar Funcionário +
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Salário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr key={funcionario.id}>
              <td>{funcionario.id}</td>
              <td>{funcionario.nome}</td>
              <td>{funcionario.cargo}</td>
              <td>{`R$ ${Number(funcionario.salario).toFixed(2)}`}</td>
              <td>
              <div style={{ justifyContent: 'center', display: 'flex' }}>
                  <button
                    className="btn-edit btn"
                    onClick={() => handleEditarFuncionario(funcionario)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                  className='btn btn-remove'
                    onClick={() => handleRemoveFuncionario(funcionario)}
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
        <ModalFuncionarios
          funcionarioData={funcionarioParaEditar}
          fecharModal={fecharModal}
        />
      )}
    </div>
  );
};

export default Funcionarios;
