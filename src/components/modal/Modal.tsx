import React from 'react';
import "./modal.css"
import { Icon } from "@mdi/react"
import { mdiLock } from "@mdi/js"

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  onSave?: () => void;
  onCancel?: () => void;
}

function Modal({ isOpen, closeModal, onSave, onCancel }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <div>
            <div className="field">
              <label className="label">E-mail</label>
              <div className="control has-icons-left">
                <input className="input" type="text" placeholder="Text input" />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Senha</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="password"
                  placeholder="Digite aqui sua senha"
                />
                <span className="icon is-small is-left">
                  <Icon path={mdiLock} size={1} />
                </span>
              </div>
            </div>

          </div>
        </section>
        <footer className="modal-card-foot">
          {onSave && (
            <button className="btn is-success" onClick={onSave}>
              Entrar
            </button>
          )}
          {onCancel && (
            <button className="btn" onClick={onCancel}>
              Cancel
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}

export default Modal;
