import ConsortiumCard from "../models/consortiumCardsModels.js";

const store = async (req, res) => {
  try {
    const { administrador, tipo, credito, parcelas, prazo, entrada, taxa, fundo, saldo } = req.body;

    await ConsortiumCard.create({ administrador, tipo, credito, parcelas, prazo, entrada, taxa, fundo, saldo });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const index = async (req, res) => {
  try {
    const content = await ConsortiumCard.find().exec();

    res.json(content);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const show = async (req, res) => {
  try {
    const content = await ConsortiumCard.findById(req.params.id)
      .populate("maintenances")
      .exec();

    res.json(content);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const update = async (req, res) => {
  try {
    const { text, title } = req.body;

    await ConsortiumCard.findByIdAndUpdate(req.params.id, {
      text,
      title
    }).exec();

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const destroy = async (req, res) => {
  try {
    await ConsortiumCard.findByIdAndDelete(req.params.id).exec();

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default {
  store,
  index,
  show,
  update,
  destroy,
};