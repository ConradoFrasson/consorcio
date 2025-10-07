import mongoose from "mongoose";

const { Schema, model } = mongoose;

const consortiumCardSchema = new Schema({
  administradora: {
    type: String,
    required: true,
  },
  credito: {
    type: String,
    required: true,
  },
  parcelas: {
    type: String,
    required: true,
  },
  prazo: {
    type: String,
    required: true,
  },
  entrada: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
    enum: ['contemplado', 'nao-contemplado']
  },
  telefone: {
    type: String,
    required: true,
  },
  valorCarta: {
    type: String,
    required: true,
  },
  taxaAdministradora: {
    type: String,
    required: true,
  },
  fundoReserva: {
    type: String,
    required: true,
  },
  saldoDevedor: {
    type: String,
    required: true,
  },
  lance: {
    type: String,
    required: true,
  },
  ativo: {
    type: Boolean,
    required: true,
    default: true,
  },
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

const ConsortiumCard = model("ConsortiumCard", consortiumCardSchema);

export default ConsortiumCard;