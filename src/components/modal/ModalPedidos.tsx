import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './modalClientes.css'; // Certifique-se de ter o arquivo de estilo adequado
import { Cliente } from '../../pages/clientes/Clientes';

interface Pedido {
  id?: number;
  cliente_id?: number;
  cliente_nome: string;
  status: string;
  data: Date;
  valor_total: number;
}

interface ModalPedidosProps {
  pedidoData: Pedido | null;
  fecharModal: () => void;
}

const ModalPedidos: React.FC<ModalPedidosProps> = ({
  pedidoData,
  fecharModal,
}) => {
  const [pedido, setPedido] = useState<Pedido>({
    id: pedidoData?.id || undefined,
    cliente_nome: '',
    status: 'aberto',
    data: new Date(),
    valor_total: 0,
  });
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    nome: '',
    email: '',
    telefone: '',
  });

  useEffect(() => {
    if (pedidoData) {
      setPedido(pedidoData);
    }
  }, [pedidoData]);

  const handleSalvar = () => {
    const token = localStorage.getItem('token');

    if (token) {
      if (pedido.id) {
        axios
          .put(`http://localhost:3000/api/pedidos/${pedido.id}`, pedido, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            console.log('Pedido Atualizado: ', response.data);
            fecharModal();
          })
          .catch((error) => {
            console.error('Erro ao atualizar pedido: ', error);
          });
      } else {
        axios
          .post('http://localhost:3000/api/pedidos/', pedido, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            console.log('Pedido criado: ', response.data);
            fecharModal();
          })
          .catch((error) => {
            console.error('Erro ao adicionar pedido: ', error);
          });
      }
    }
  };

  const getClientes = (nome?: string) => {
    let params;
    const token = localStorage.getItem('token');
    if (nome) {
      params = {
        nome: nome,
      };
    } else {
      params = {};
    }

    if (token) {
      axios
        .get('http://localhost:3000/api/clientes/', {
          headers: {
            Authorization: `${token}`,
          },
          params: params,
        })
        .then((response) => {
          setClientes(response.data);
        })
        .catch((error) => {
          console.error('Erro ao obter clientes: ', error);
        });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setPedido({ ...pedido, cliente_nome: inputText });
    getClientes(inputText);
    setShowOptions(inputText.trim().length > 0);
  };

  const handleOptionClick = (cliente: Cliente | undefined) => {
    console.log('clientola => ', cliente)
    if (cliente && cliente.id) {
      setPedido({ ...pedido, cliente_id: cliente.id, cliente_nome: cliente.nome });
      setShowOptions(false);
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
              <label className="label">Cliente</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Cliente"
                  value={pedido.cliente_nome}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {showOptions && (
              <div className="options-container">
                {clientes.map((cliente) => (
                  <div
                    key={cliente.id}
                    className="option"
                    onClick={() => handleOptionClick(cliente)}
                  >
                    {cliente.nome}
                  </div>
                ))}
              </div>
            )}
            
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="btn is-success" onClick={handleSalvar}>
            Salvar
          </button>
          <button className="btn" onClick={fecharModal}>
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ModalPedidos;
