import React, { useEffect, useState } from 'react';
import ConsorcioForm from '../components/ConsorcioForm';

export default function AdminConsorcios() {
  const [consorcios, setConsorcios] = useState([]);
  const [edit, setEdit] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('/api/consorcios').then(res => res.json()).then(setConsorcios);
  }, []);

  function handleAdd(data) {
    fetch('/api/consorcios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': token },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(novo => setConsorcios(c => [...c, novo]));
  }

  function handleEdit(data) {
    fetch(`/api/consorcios/${edit._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': token },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(atualizado => {
      setConsorcios(c => c.map(x => x._id === atualizado._id ? atualizado : x));
      setEdit(null);
    });
  }

  function handleDelete(id) {
    fetch(`/api/consorcios/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': token }
    }).then(() => setConsorcios(c => c.filter(x => x._id !== id)));
  }

  return (
    <div>
      <h1>Administração de Consórcios</h1>
      <ConsorcioForm onSubmit={edit ? handleEdit : handleAdd} initial={edit} />
      <table>
        <thead>
          <tr>
            <th>Crédito</th><th>Administradora</th><th>Entrada</th><th>Prazo</th><th>Parcelas</th><th>Tipo</th><th>Contemplado</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {consorcios.map(c => (
            <tr key={c._id}>
              <td>{c.credito}</td>
              <td>{c.administradora}</td>
              <td>{c.entrada}</td>
              <td>{c.prazo}</td>
              <td>{c.parcelas}</td>
              <td>{c.tipo}</td>
              <td>{c.contemplado ? 'Sim' : 'Não'}</td>
              <td>
                <button onClick={() => setEdit(c)}>Editar</button>
                <button onClick={() => handleDelete(c._id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}