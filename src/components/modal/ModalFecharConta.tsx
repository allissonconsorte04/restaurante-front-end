import React, { useState, useEffect } from 'react';
import './modalClientes.css'; // Certifique-se de ter o arquivo de estilo adequado
import api from '../../services/api';
import { Pedido } from './ModalItensPedido';

interface ModalFecharContaProps {
  pedidoId?: number;
  fecharModal: () => void;
}

const ModalFecharConta: React.FC<ModalFecharContaProps> = ({
  pedidoId,
  fecharModal,
}) => {
  const [pessoas, setPessoas] = useState<number>(1);
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [valorPorPessoa, setValorPorPessoa] = useState<number | null>(null);

  useEffect(() => {
    api
      .get(`/pedidos/${pedidoId}`)
      .then((response) => {
        setPedido(response.data);
        calcularValorPorPessoa(response.data.valor_total, pessoas);
      })
      .catch((error) => {
        console.error('Erro ao obter Pedido: ', error);
      });
  }, [pedidoId, pessoas]);

  const fecharPedido = () => {
    api
      .post(`/pedidos/${pedidoId}/fechar`, { pessoas })
      .then((response) => {
        console.log('Pedido fechado com sucesso: ', response.data);
        // Aqui você pode adicionar lógica adicional, se necessário
        fecharModal();
      })
      .catch((error) => {
        console.error('Erro ao fechar pedido: ', error);
      });
  };

  const calcularValorPorPessoa = (valorTotal: string, numPessoas: number) => {
    const valorTotalFloat = parseFloat(valorTotal);
    const valorPorPessoaCalculado =
      numPessoas > 0 ? valorTotalFloat / numPessoas : null;
    setValorPorPessoa(valorPorPessoaCalculado);
  };

  const formatarData = (data: string): string => {
    const date = new Date(data);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    return date.toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={fecharModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Fechar Conta</p>
          <button
            className="delete"
            aria-label="close"
            onClick={fecharModal}
          ></button>
        </header>
        <section className="modal-card-body">
          {pedido && (
            <div>
              <div className="columns">
                <div className="column">
                  <p>Data: {formatarData(pedido.data)}</p>
                </div>
                <div className="column">
                  <p>Status: {pedido.status}</p>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  {pedido.itens.map((item, index) => (
                    <tr key={index}>
                      <td>{item.produto_id}</td>
                      <td>{item.produto_nome}</td>
                      <td>{item.quantidade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="columns">
                <div className="column">
                  <p>
                    Valor Total: R$ {parseFloat(pedido.valor_total).toFixed(2)}
                  </p>
                </div>
                <div className="column">
                  <p>
                    Valor por Pessoa:{' '}
                    {valorPorPessoa ? `R$ ${valorPorPessoa.toFixed(2)}` : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="field">
            <label className="label">Número de Pessoas</label>
            <div className="control">
              <input
                className="input"
                type="number"
                placeholder="Número de Pessoas"
                value={pessoas}
                onChange={(e) =>
                  setPessoas(Math.max(1, Math.min(4, parseInt(e.target.value))))
                }
                min="1"
                max="4"
              />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-primary" onClick={fecharPedido}>
            Fechar Pedido
          </button>
          <button className="button" onClick={fecharModal}>
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ModalFecharConta;
