const express = require('express');
const router = express.Router();
const Pezzo = require('../models/Pezzo');

// GET tutti i pezzi
router.get('/', async (req, res) => {
  const pezzi = await Pezzo.find().populate('locazione');
  res.json(pezzi);
});

// POST nuovo pezzo
router.post('/', async (req, res) => {
  const { nome, quantita, locazione } = req.body;
  const nuovoPezzo = new Pezzo({ nome, quantita, locazione });
  await nuovoPezzo.save();
  res.status(201).json(nuovoPezzo);
});

// PUT modifica pezzo
router.put('/:id', async (req, res) => {
  const { nome, quantita, locazione } = req.body;
  const pezzo = await Pezzo.findByIdAndUpdate(
    req.params.id,
    { nome, quantita, locazione },
    { new: true }
  );
  res.json(pezzo);
});

// DELETE pezzo
router.delete('/:id', async (req, res) => {
  await Pezzo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Pezzo eliminato' });
});

module.exports = router;