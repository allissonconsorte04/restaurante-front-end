import React, { useState, useEffect } from 'react';
import './modalClientes.css';
import api from '../../services/api';

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
    if (produto.id) {
      api
        .put(`/produtos/${produto.id}`, produto)
        .then((response) => {
          console.log('Produto Atualizado: ', response.data);
          fecharModal();
        })
        .catch((error) => {
          console.error('Erro ao atualizar produto: ', error);
        });
    } else {
      api
        .post('/produtos/', produto)
        .then((response) => {
          console.log('Produto criado: ', response.data);
          fecharModal();
        })
        .catch((error) => {
          console.error('Erro ao adicionar produto: ', error);
        });
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
                    setProduto({
                      ...produto,
                      preco: parseFloat(e.target.value),
                    })
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
