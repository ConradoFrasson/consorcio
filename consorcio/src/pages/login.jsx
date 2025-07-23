import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogin() {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, pass })
    });
    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem('token', token);
      navigate('/admin');
    } else {
      setError('Usuário ou senha inválidos');
    }
  }

  return (
    <div>
      <h1>Login Administrador</h1>
      <input value={user} onChange={e => setUser(e.target.value)} placeholder="Usuário" />
      <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Senha" />
      <button onClick={handleLogin}>Entrar</button>
      {error && <p>{error}</p>}
    </div>
  );
}