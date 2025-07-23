const mongoose = require('mongoose');

const ConsorcioSchema = new mongoose.Schema({
  credito: Number,
  administradora: String,
  entrada: Number,
  prazo: Number,
  parcelas: Number,
  tipo: String,
  contemplado: Boolean
});

module.exports = mongoose.model('Consorcio', ConsorcioSchema);