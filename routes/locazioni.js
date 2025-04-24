const express = require('express');
const router = express.Router();
const Locazione = require('../models/Locazione');

// GET tutte le locazioni
router.get('/', async (req, res) => {
  const locazioni = await Locazione.find();
  res.json(locazioni);
});

// POST nuova locazione (opzionale)
router.post('/', async (req, res) => {
  const { nome } = req.body;
  const nuova = new Locazione({ nome });
  await nuova.save();
  res.status(201).json(nuova);
});

module.exports = router;