import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/login.jsx';
import ConsorciosList from '../pages/consorciosList.jsx';
import ConsorcioDetalhe from '../pages/consorcioDetalhe.jsx';
import AdminConsorcios from '../pages/adminConsorcios.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConsorciosList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/consorcio/:id" element={<ConsorcioDetalhe />} />
        <Route path="/admin" element={<AdminConsorcios />} />
      </Routes>
    </Router>
  );
}