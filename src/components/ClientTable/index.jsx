import React from "react";


export function ClientTable({ clientsList }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Tel.</th>
          <th>Empresa</th>
        </tr>
      </thead>
      <tbody>
        {clientsList.map((client, key) => {
          return (
            <tr key={key}>
              <td>{client.clientName}</td>
              <td>{client.email}</td>
              <td>{client.tel}</td>
              <td>{client.company}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
