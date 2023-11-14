import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './modalClientes.css'; // Certifique-se de ter o arquivo de estilo adequado

interface Pedido {
  id?: number;
  cliente_nome: string;
  status: string;
  data: number;
  total: number;
}

interface ModalPedidosProps {
  pedidoData: Pedido;
  fecharModal: () => void;
}

const ModalPedidos: React.FC<ModalPedidosProps> = ({ pedidoData, fecharModal }) => {
  const [pedido, setPedido] = useState<Pedido>({
    id: pedidoData?.id || undefined,
    cliente_nome: '',
    status: 'aberto',
    data: 0,
    total: 0,
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
                  onChange={(e) =>
                    setPedido({ ...pedido, cliente_nome: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Status</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Produto"
                  value={pedido.status}
                  onChange={(e) =>
                    setPedido({ ...pedido, status: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Quantidade</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="Data"
                  value={pedido.data}
                  onChange={(e) =>
                    setPedido({ ...pedido, data: parseFloat(e.target.value) })
                  }
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Total</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="Total"
                  value={pedido.total}
                  onChange={(e) =>
                    setPedido({ ...pedido, total: parseFloat(e.target.value) })
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
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ModalPedidos;
