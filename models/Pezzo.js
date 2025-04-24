const mongoose = require('mongoose');

const pezzoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  quantita: { type: Number, required: true },
  locazione: { type: mongoose.Schema.Types.ObjectId, ref: 'Locazione', required: true }
});

module.exports = mongoose.model('Pezzo', pezzoSchema);