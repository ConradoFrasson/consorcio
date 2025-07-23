import React, { useState } from 'react';

export default function ConsorcioForm({ initial, onSubmit }) {
  const [form, setForm] = useState(initial || {
    credito: '', administradora: '', entrada: '', prazo: '', parcelas: '', tipo: '', contemplado: false
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="credito" value={form.credito} onChange={handleChange} placeholder="Crédito (R$)" required />
      <input name="administradora" value={form.administradora} onChange={handleChange} placeholder="Administradora" required />
      <input name="entrada" value={form.entrada} onChange={handleChange} placeholder="Entrada (R$)" required />
      <input name="prazo" value={form.prazo} onChange={handleChange} placeholder="Prazo" required />
      <input name="parcelas" value={form.parcelas} onChange={handleChange} placeholder="Parcelas (R$)" required />
      <input name="tipo" value={form.tipo} onChange={handleChange} placeholder="Tipo" required />
      <label>
        Contemplado
        <input type="checkbox" name="contemplado" checked={form.contemplado} onChange={handleChange} />
      </label>
      <button type="submit">Salvar</button>
    </form>
  );
}