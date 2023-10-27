import React from 'react';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  onSave?: () => void;
  onCancel?: () => void;
}

function Modal({ isOpen, closeModal, title, onSave, onCancel }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="section__title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <div>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" type="text" placeholder="Text input" />
              </div>
            </div>

            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input is-success"
                  type="text"
                  placeholder="Text input"
                  value="bulma"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check"></i>
                </span>
              </div>
              <p className="help is-success">This username is available</p>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input is-danger"
                  type="email"
                  placeholder="Email input"
                  value="hello@"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              </div>
              <p className="help is-danger">This email is invalid</p>
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
