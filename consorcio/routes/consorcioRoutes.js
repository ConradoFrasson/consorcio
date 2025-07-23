const express = require('express');
const router = express.Router();
const Consorcio = require('../models/consorcio');
const auth = require('../middleware/auth');

// Listar todos
router.get('/', async (req, res) => {
  const consorcios = await Consorcio.find();
  res.json(consorcios);
});

// Detalhes
router.get('/:id', async (req, res) => {
  const consorcio = await Consorcio.findById(req.params.id);
  res.json(consorcio);
});

// Adicionar (admin)
router.post('/', auth, async (req, res) => {
  const novo = new Consorcio(req.body);
  await novo.save();
  res.json(novo);
});

// Editar (admin)
router.put('/:id', auth, async (req, res) => {
  const atualizado = await Consorcio.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(atualizado);
});

// Remover (admin)
router.delete('/:id', auth, async (req, res) => {
  await Consorcio.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;