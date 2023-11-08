import React, { useState, useEffect } from 'react';
import './cardproduto.css';
import axios from 'axios';

interface Product {
  id: number;
  nome: string;
  preco: string;
}

const CardProduto = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // Verifica se o token de autenticação está presente no armazenamento local.
    const token = localStorage.getItem('token');

    if (token) {
      // Se o token estiver presente, faça a solicitação HTTP com o cabeçalho de autorização.
      axios
        .get('http://localhost:3000/api/produtos/', {
          headers: {
            Authorization: `${token}`, // Adicione o token ao cabeçalho de autorização
          },
        })
        .then((response) => {
          setProdutos(response.data);
        })
        .catch((error) => {
          console.error('Erro ao obter produtos:', error);
        });
    }
  }, []);

  return (
    <div className="card-container">
      {produtos.map((produto: Product) => (
        <div className="card-content" key={produto.id}>
          <div className="product-content">
            <h2>{produto.nome}</h2>
            <p>Preço: R$ {produto.preco}</p>
          </div>
          <button className="btn-add">+</button>
        </div>
      ))}
    </div>
  );
};

export default CardProduto;
