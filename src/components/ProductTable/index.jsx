import React from "react";
export function ProductTable({ productsList }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Valor</th>
          <th>Descrição</th>
          <th>Empresa</th>
        </tr>
      </thead>
      <tbody>
        {productsList.map((product, key) => {
          return (
            <tr key={key}>
              <td>{product.productName}</td>
              <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.value)}</td>
              <td>{product.description}</td>
              <td>{product.company}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
