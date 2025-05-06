const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
const router = express.Router();
const PezzoDB = require('../config/pezzoModel');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const upload = multer(); // Multer senza storage: useremo memoria (buffer)
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Simone:S4ikJ4B2oYjj6Qpt@cluster0.ungo5pt.mongodb.net/?appName=Cluster0";
const { ObjectId } = require('mongodb'); // serve per convertire l'ID


app.use(cors());

app.use('/api/pezzi', require('../../routes/pezzi'));
app.use('/api/locazioni', require('../../routes/locazioni'));

// Serve i file statici generati da React
router.use(express.static(path.join(__dirname, '../../my-app/build')));

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      const db = client.db("Magazzino");
      pezzi = db.collection("pezzi");
      locazioni = db.collection("locazioni");
      // Send a ping to confirm a successful connection
      await client.db("Magazzino").command({ ping: 1 });
      console.log("Db MongoDB connesso per magazzino!");
    } finally {
    }
  }
run().catch(console.dir);

const utenteSchema = new mongoose.Schema({
  nome: String,
  quantita: Number,
  locazioni: String,
});

router.get('/user/dashboard/magazzino', (req, res) => {
  res.sendFile(path.join(__dirname, '../../my-app/build', 'index.html'));
});

router.post('/pezzi-db', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nessun file inviato' });
    }

    // Recuperiamo il contenuto del file
    const fileBuffer = req.file.buffer;
    const jsonString = fileBuffer.toString('utf8');
    const pezzo = JSON.parse(jsonString);
    const username = req.cookies.username.username;

    pezzo.forEach(p => {
      p.creatoIl = new Date();
      p.inseritoDa = username; // Aggiungi l'utente che ha inserito il pezzo
    });
    
    pezzi.insertMany(pezzo);
    res.status(201).json({ messaggio: 'Pezzo inserito' });

  } catch (err) {
    console.error('Errore durante l\'inserimento:', err);
    res.status(500).json({ errore: 'Errore del server' });
  }
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

router.get('/pezzi-db', async (req, res) => {
  try {
    oggetti = await pezzi.find().toArray();
    console.log(oggetti);
    res.json(oggetti);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});


// DELETE /elimina-pezzi-db/:id
router.delete('/elimina-pezzi-db/:id', async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID non valido' });
  }

  try {
    const result = await pezzi.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Pezzo non trovato' });
    }

    res.status(200).json({ message: 'Pezzo eliminato con successo' });
  } catch (error) {
    console.error('Errore durante l\'eliminazione:', error);
    res.status(500).json({ error: 'Errore del server' });
  }
});

router.post('/locazione-db', async (req, res) => {
  console.log('Headers:', req.headers['content-type']);
  console.log('Body:', req.body); // <-- vediamo cosa arriva

  const { nome } = req.body;

  if (!nome || !nome.trim()) {
    return res.status(400).json({ error: 'Il nome della locazione è obbligatorio.' });
  }

  try {
    //const username = req.cookies.username.username;

    const nuovaLocazione = {
      nome: nome.trim(),
      creatoIl: new Date(),
      //inseritoDa: username
    };

    
    const result = await locazioni.insertOne(nuovaLocazione);
    res.status(201).json({ message: 'Locazione salvata', id: result.insertedId });
  } catch (err) {
    console.error('Errore durante il salvataggio della locazione:', err);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

router.get('/locazione-db', async (req, res) => {
    try {
      lista = await locazioni.find().toArray();
      console.log(lista)
      res.json(lista);  // Restituisce i dati come risposta
    } catch (parseError) {
      return res.status(500).json({ error: 'Errore nel parsare il file JSON' });
    }
});

router.delete('/elimina-locazioni-db/:id', async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID non valido' });
  }

  try {
    const result = await locazioni.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Locazione non trovata' });
    }

    res.status(200).json({ message: 'Locazione eliminata con successo' });
  } catch (error) {
    console.error('Errore durante l\'eliminazione:', error);
    res.status(500).json({ error: 'Errore del server' });
  }
});

router.put('/pezzi-db/:id', async (req, res) => {
  const id = req.params.id;
  const { nome, quantita, locazione } = req.body;
  const username = req.cookies.username.username;

  try {
    const result = await pezzi.updateOne(
      { _id: new ObjectId(id) },
      { $set: { nome, quantita: parseInt(quantita), locazione, modificatoIl: new Date(), username } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Pezzo non trovato' });
    }

    res.status(200).json({ message: 'Pezzo aggiornato correttamente' });
  } catch (err) {
    console.error('Errore durante la PUT:', err);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

module.exports = router;