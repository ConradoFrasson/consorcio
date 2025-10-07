import ConsortiumCard from "../models/consortiumCardsModels.js";

// Create a new consortium card
const store = async (req, res) => {
  try {
    const cardData = req.body;
    
    // Validate required fields
    const requiredFields = [
      'administradora', 'credito', 'parcelas', 'prazo', 'entrada', 
      'tipo', 'telefone', 'valorCarta', 'taxaAdministradora', 
      'fundoReserva', 'saldoDevedor', 'lance'
    ];
    
    for (const field of requiredFields) {
      if (!cardData[field]) {
        return res.status(400).json({ 
          message: `Field '${field}' is required` 
        });
      }
    }

    const newCard = await ConsortiumCard.create(cardData);
    res.status(201).json(newCard);
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all active consortium cards
const index = async (req, res) => {
  try {
    const cards = await ConsortiumCard.find({ ativo: true })
      .sort({ createdAt: -1 })
      .exec();
    
    res.json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all consortium cards (including inactive) - for admin
const getAllCards = async (req, res) => {
  try {
    const cards = await ConsortiumCard.find()
      .sort({ createdAt: -1 })
      .exec();
    
    res.json(cards);
  } catch (error) {
    console.error('Error fetching all cards:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get a single consortium card by ID
const show = async (req, res) => {
  try {
    const card = await ConsortiumCard.findById(req.params.id).exec();
    
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    
    res.json(card);
  } catch (error) {
    console.error('Error fetching card:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update a consortium card
const update = async (req, res) => {
  try {
    const updatedCard = await ConsortiumCard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).exec();
    
    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }
    
    res.json(updatedCard);
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a consortium card
const destroy = async (req, res) => {
  try {
    const deletedCard = await ConsortiumCard.findByIdAndDelete(req.params.id).exec();
    
    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }
    
    res.json({ success: true, message: "Card deleted successfully" });
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  store,
  index,
  getAllCards,
  show,
  update,
  destroy,
};