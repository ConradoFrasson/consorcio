import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ConsorcioDetalhe() {
  const { id } = useParams();
  const [consorcio, setConsorcio] = useState(null);

  useEffect(() => {
    fetch(`/api/consorcios/${id}`)
      .then(res => res.json())
      .then(setConsorcio);
  }, [id]);

  if (!consorcio) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Detalhes do Consórcio</h1>
      <p>Crédito: R$ {consorcio.credito}</p>
      <p>Administradora: {consorcio.administradora}</p>
      <p>Entrada: R$ {consorcio.entrada}</p>
      <p>Prazo: {consorcio.prazo} meses</p>
      <p>Parcelas: R$ {consorcio.parcelas}</p>
      <p>Tipo: {consorcio.tipo}</p>
      <p>Contemplado: {consorcio.contemplado ? 'Sim' : 'Não'}</p>
    </div>
  );
}