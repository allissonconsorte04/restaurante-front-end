import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './modalClientes.css';

interface Cliente {
  id?: number;
  email: string;
  nome: string;
  telefone: string;
}

interface ModalClientesProps {
  clienteData: Cliente | null; // Declare a prop como Cliente | null
  fecharModal: () => void;
}

const ModalClientes: React.FC<ModalClientesProps> = ({
  clienteData,
  fecharModal,
}) => {
  const [cliente, setCliente] = useState<Cliente>({
    id: clienteData?.id || undefined,
    nome: '',
    email: '',
    telefone: '',
  });

  useEffect(() => {
    console.log('cliente', cliente.id);
    if (clienteData) {
      setCliente(clienteData); // Atualize o estado apenas se clienteData não for nulo
    }
  }, [clienteData]);

  const handleSalvar = () => {
    const token = localStorage.getItem('token');
    if (token) {
      if (cliente.id) {
        axios
          .put(`http://localhost:3000/api/clientes/${cliente.id}`, cliente, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            console.log('Cliente Atualizado: ', response.data);
            fecharModal();
          })
          .catch((error) => {
            console.error('Erro ao atualizar cliente: ', error);
          });
      } else {
        axios
          .post('http://localhost:3000/api/clientes/', cliente, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            console.log('Cliente criado: ', response.data);
            fecharModal();
          })
          .catch((error) => {
            console.error('Erro ao adicionar cliente: ', error);
          });
      }
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={fecharModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <button
            className="delete"
            aria-label="close"
            onClick={fecharModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <div>
            <div className="field">
              <label className="label">Nome</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Nome"
                  value={cliente.nome}
                  onChange={(e) =>
                    setCliente({ ...cliente, nome: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="field">
              <label className="label">E-mail</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Email"
                  value={cliente.email}
                  onChange={(e) =>
                    setCliente({ ...cliente, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Telefone</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Telefone"
                  value={cliente.telefone}
                  onChange={(e) =>
                    setCliente({ ...cliente, telefone: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="btn is-success" onClick={handleSalvar}>
            Salvar
          </button>
          <button className="btn" onClick={fecharModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ModalClientes;
