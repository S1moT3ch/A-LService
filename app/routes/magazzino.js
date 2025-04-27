const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());

app.use('/api/pezzi', require('../../routes/pezzi'));
app.use('/api/locazioni', require('../../routes/locazioni'));

// Serve i file statici generati da React
router.use(express.static(path.join(__dirname, '../../my-app/build')));

router.get('/user/dashboard/magazzino', (req, res) => {
  res.sendFile(path.join(__dirname, '../../my-app/build', 'index.html'));
});

app.post('/pezzi-json', (req, res) => {
  const pezzi = req.body; // 👈 tutto l'array inviato
  fs.writeFileSync('../json/pezzi.json', JSON.stringify(pezzi, null, 2));
  res.status(200).send('Pezzi salvati');
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = router;