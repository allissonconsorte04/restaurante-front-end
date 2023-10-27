import React, { useState } from 'react'
import Logo from '../../assets/logo_restaurante.png'
import Modal from '../modal/Modal';

function Navbar() {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="https://bulma.io">
        <img src={Logo} width="60" height="50" alt="Bulma Logo" style={{maxHeight:100}}/>
      </a>
      <a
        role="button"
        className="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <a className="navbar-item">Início</a>
        <a className="navbar-item">Produtos</a>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <a className="btn is-primary" onClick={openModal}>
              <strong>Login</strong>
            </a>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} closeModal={closeModal} title='Titulo pika' onSave={() => {}} />
    </div>
  </nav>
  )
}

export default Navbar
