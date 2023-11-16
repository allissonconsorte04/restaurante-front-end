import React, { useState, useEffect } from 'react';
import './modalClientes.css'; // Certifique-se de ter o arquivo de estilo adequado
import api from '../../services/api';

interface ItemPedido {
  produto_id: number;
  produto_nome: string;
  quantidade: number;
}

export interface Pedido {
  id: number;
  data: string;
  status: string;
  cliente_id: number;
  valor_total: string;
  itens: ItemPedido[];
}

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

interface ModalItensPedidoProps {
  pedidoId?: number;
  fecharModal: () => void;
}

const ModalItensPedido: React.FC<ModalItensPedidoProps> = ({
  pedidoId,
  fecharModal,
}) => {
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [novoItem, setNovoItem] = useState<ItemPedido>({
    produto_id: 0,
    produto_nome: '',
    quantidade: 0,
  });

  useEffect(() => {
    // Carregar dados do pedido ao abrir o modal
    api
      .get(`/pedidos/${pedidoId}`)
      .then((response) => {
        setPedido(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter pedido: ', error);
      });

    // Carregar lista de produtos
    api
      .get('/produtos')
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter produtos: ', error);
      });
  }, [pedidoId]);

  const adicionarItem = () => {
    api
      .post(`/pedidos/adicionar-item/${pedidoId}`, novoItem)
      .then((response) => {
        console.log('Item adicionado ao pedido: ', response.data);
        // Atualizar o estado do pedido após adicionar o item
        setPedido((prevPedido) => ({
          ...prevPedido!,
          itens: [...prevPedido!.itens, novoItem],
        }));
        // Limpar o estado do novo item
        setNovoItem({ produto_id: 0, quantidade: 0, produto_nome: '' });
      })
      .catch((error) => {
        console.error('Erro ao adicionar item ao pedido: ', error);
      });
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={fecharModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            Pedido {pedido ? pedido.id : 'Novo'}
          </p>
          <button
            className="delete"
            aria-label="close"
            onClick={fecharModal}
          ></button>
        </header>
        <section className="modal-card-body">
          {pedido && (
            <div>
              <p>Detalhes do Pedido:</p>
              <p>ID: {pedido.id}</p>
              <p>Status: {pedido.status}</p>
              <p>Valor Total: R$ {parseFloat(pedido.valor_total).toFixed(2)}</p>
              <p>Itens do Pedido:</p>
              <ul>
                {pedido.itens.map((item, index) => (
                  <li key={index}>
                    Produto ID: {item.produto_id}, Quantidade: {item.quantidade}
                  </li>
                ))}
              </ul>
              <hr />
              <p>Adicionar Novo Item:</p>
              <div className="field">
                <label className="label">Produto</label>
                <div className="control">
                  <div className="select">
                    <select
                      onChange={(e) =>
                        setNovoItem({
                          ...novoItem,
                          produto_id: parseInt(e.target.value),
                        })
                      }
                    >
                      <option value="0">Selecione um produto</option>
                      {produtos.map((produto) => (
                        <option key={produto.id} value={produto.id}>
                          {produto.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Quantidade</label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    placeholder="Quantidade"
                    value={novoItem.quantidade}
                    onChange={(e) =>
                      setNovoItem({
                        ...novoItem,
                        quantidade: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <button className="button is-primary" onClick={adicionarItem}>
                Adicionar Item
              </button>
            </div>
          )}
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={fecharModal}>
            Fechar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ModalItensPedido;
