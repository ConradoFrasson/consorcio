import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ConsorciosList() {
  const [consorcios, setConsorcios] = useState([]);

  useEffect(() => {
    fetch('/api/consorcios')
      .then(res => res.json())
      .then(setConsorcios);
  }, []);

  return (
    <div>
      <h1>Consórcios</h1>
      <table>
        <thead>
          <tr>
            <th>Crédito (R$)</th>
            <th>Administradora</th>
            <th>Entrada (R$)</th>
            <th>Prazo</th>
            <th>Parcelas (R$)</th>
            <th>Tipo</th>
            <th>Contemplado</th>
          </tr>
        </thead>
        <tbody>
          {consorcios.map(c => (
            <tr key={c._id}>
              <td><Link to={`/consorcio/${c._id}`}>{c.credito}</Link></td>
              <td>{c.administradora}</td>
              <td>{c.entrada}</td>
              <td>{c.prazo}</td>
              <td>{c.parcelas}</td>
              <td>{c.tipo}</td>
              <td>{c.contemplado ? 'Sim' : 'Não'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}