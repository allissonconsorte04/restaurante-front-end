import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './modalClientes.css'; // Certifique-se de ter o arquivo de estilo adequado

interface Funcionario {
  id?: number;
  nome: string;
  cargo: string;
  salario: number;
}

interface ModalFuncionariosProps {
  funcionarioData: Funcionario | null;
  fecharModal: () => void;
}

const ModalFuncionarios: React.FC<ModalFuncionariosProps> = ({
  funcionarioData,
  fecharModal,
}) => {
  const [funcionario, setFuncionario] = useState<Funcionario>({
    id: funcionarioData?.id || undefined,
    nome: '',
    cargo: '',
    salario: 0,
  });

  useEffect(() => {
    if (funcionarioData) {
      setFuncionario(funcionarioData);
    }
  }, [funcionarioData]);

  const formatarSalario = (valor: number) => {
    const valorFormatado = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
    return valorFormatado;
  };

  const handleSalvar = () => {
    const token = localStorage.getItem('token');

    if (token) {
      if (funcionario.id) {
        axios
          .put(
            `http://localhost:3000/api/funcionarios/${funcionario.id}`,
            funcionario,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((response) => {
            console.log('Funcionário Atualizado: ', response.data);
            fecharModal();
          })
          .catch((error) => {
            console.error('Erro ao atualizar funcionário: ', error);
          });
      } else {
        axios
          .post('http://localhost:3000/api/funcionarios/', funcionario, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            console.log('Funcionário criado: ', response.data);
            fecharModal();
          })
          .catch((error) => {
            console.error('Erro ao adicionar funcionário: ', error);
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
                  value={funcionario.nome}
                  onChange={(e) =>
                    setFuncionario({ ...funcionario, nome: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Cargo</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Cargo"
                  value={funcionario.cargo}
                  onChange={(e) =>
                    setFuncionario({ ...funcionario, cargo: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Salário</label>
              <div className="control">
                <div className="field has-addons">
                  <p className="control">
                    <span className="button is-static">R$</span>
                  </p>
                  <p className="control">
                    <input
                      className="input"
                      type="number"
                      step="0.01"
                      placeholder="Salário"
                      value={funcionario.salario}
                      onChange={(e) =>
                        setFuncionario({
                          ...funcionario,
                          salario: parseFloat(e.target.value),
                        })
                      }
                    />
                  </p>
                </div>
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

export default ModalFuncionarios;
