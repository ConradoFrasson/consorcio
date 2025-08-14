const consortiumCardSchema = new Schema({
  administrador: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  credito: {
    type: Number,
    required: true,
  },
  parcelas: {
    type: Number,
    required: true,
  },
  prazo: {
    type: Number,
    required: true,
  },
  entrada: {
    type: Number,
    required: true,
  },
  taxa: {
    type: Number,
    required: true,
  },
  fundo: {
    type: Number,
    required:true,
  },
  saldo: {
    type: Number,
    required: true,
  },
});

const ConsortiumCard = model("ConsortiumCard", consortiumCardSchema);

export default ConsortiumCard;