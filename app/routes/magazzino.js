const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const router = express.Router();
const PezzoDB = require('../config/pezzoModel');
const mongoose = require('mongoose');
require('dotenv').config();
const multer = require('multer');
const upload = multer(); // Multer senza storage: useremo memoria (buffer)

app.use(express.json());

app.use('/api/pezzi', require('../../routes/pezzi'));
app.use('/api/locazioni', require('../../routes/locazioni'));

// Serve i file statici generati da React
router.use(express.static(path.join(__dirname, '../../my-app/build')));

router.get('/user/dashboard/magazzino', (req, res) => {
  res.sendFile(path.join(__dirname, '../../my-app/build', 'index.html'));
});

router.post('/pezzi-json', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nessun file inviato' });
    }

    // Recuperiamo il contenuto del file
    const fileBuffer = req.file.buffer;
    const jsonString = fileBuffer.toString('utf8');
    const pezzi = JSON.parse(jsonString);

    console.log('Dati ricevuti:', pezzi);


    const filePath = path.join(__dirname, '../json/pezzi.json');
    let existingData = [];

    // Controlla se il file esiste già
    if (fs.existsSync(filePath)) {
      // Leggi il file esistente
      const existingFileBuffer = fs.readFileSync(filePath);
      try {
        existingData = JSON.parse(existingFileBuffer.toString('utf8'));
      } catch (parseError) {
        console.error('Errore nel parsing del file esistente:', parseError);
      }
    }

    // Aggiungi i nuovi dati ai dati esistenti
    const updatedData = [...existingData, ...pezzi];

    // Scrivi il nuovo array nel file (sovrascrivendo)
    fs.promises.writeFile(filePath, JSON.stringify(updatedData, null, 2));


    // Aggiungi i dati al database
    for (const pezzo of pezzi) {
      const newPezzo = new PezzoDB(pezzo); // Crea una nuova istanza del modello
      newPezzo.save();  // Salva l'oggetto nel database
    }
    res.status(200).json({ message: 'File JSON ricevuto correttamente' });
  } catch (error) {
    console.error('Errore parsing JSON:', error);
    res.status(500).json({ error: 'Errore nel processamento del file' });
  }
});

router.get('/pezzi-json', (req, res) => {
  const filePath = path.join(__dirname, '../json/pezzi.json');  // Percorso del file JSON

  // Leggi il file JSON in modo sincrono o asincrono
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Errore nel leggere il file' });
    }

    try {
      const pezzi = JSON.parse(data);  // Converte il contenuto del file in un oggetto JSON
      res.json(pezzi);  // Restituisce i dati come risposta
    } catch (parseError) {
      return res.status(500).json({ error: 'Errore nel parsare il file JSON' });
    }
  });
});


module.exports = router;