import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './modalClientes.css';

interface Produto {
  id?: number;
  nome: string;
  preco: number;
}

interface ModalProdutosProps {
  produtoData: Produto | null;
  fecharModal: () => void;
}

const ModalProdutos: React.FC<ModalProdutosProps> = ({
  produtoData,
  fecharModal,
}) => {
  const [produto, setProduto] = useState<Produto>({
    id: produtoData?.id || undefined,
    nome: '',
    preco: 0,
  });

  useEffect(() => {
    if (produtoData) {
      setProduto(produtoData);
    }
  }, [produtoData]);

  const handleSalvar = () => {
    const token = localStorage.getItem('token');

    if (token) {
      if (produto.id) {
        axios
          .put(`http://localhost:3000/api/produtos/${produto.id}`, produto, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            console.log('Produto Atualizado: ', response.data);
            fecharModal();
          })
          .catch((error) => {
            console.error('Erro ao atualizar produto: ', error);
          });
      } else {
        axios
          .post('http://localhost:3000/api/produtos/', produto, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            console.log('Produto criado: ', response.data);
            fecharModal();
          })
          .catch((error) => {
            console.error('Erro ao adicionar produto: ', error);
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
                  value={produto.nome}
                  onChange={(e) =>
                    setProduto({ ...produto, nome: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Preço</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="Preço"
                  value={produto.preco}
                  onChange={(e) =>
                    setProduto({ ...produto, preco: parseFloat(e.target.value) })
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

export default ModalProdutos;
