const mongoose = require('mongoose');

const locazioneSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Locazione', locazioneSchema);