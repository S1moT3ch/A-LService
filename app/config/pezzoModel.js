const mongoose = require('mongoose');

// Verifica se il modello è già stato definito
const PezzoDB = mongoose.models.PezzoDB || mongoose.model('PezzoDB', new mongoose.Schema({
  nome: { type: String, required: true },
  quantità: { type: Number, required: true },
  locazione: { type: String, required: true },
}));

module.exports = PezzoDB;