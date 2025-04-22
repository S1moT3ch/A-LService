const express = require('express');
const app= express();
app.use(express.json());
const router = express.Router();
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../json/temp.json');


router.get('/dashboard/nome=:username', (req, res) => {
    // Leggi il file JSON ogni volta che viene fatta la richiesta
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Errore nella lettura del file JSON:', err);
        return res.status(500).json({ error: 'Errore interno nel server' });
      }
  
      try {
        const nome = JSON.parse(data);
        const username = nome.username;
        console.log(nome.username);
        res.render('dashboard');

      } catch (parseErr) {
        console.error('Errore nel parsing del JSON:', parseErr);
        res.status(500).json({ error: 'Errore nel parsing del file JSON' });
      }
    });
  });
  



router.get('/dashboard-2', (req,res) =>{
    const html = "<h3><a href='/logout'>Effettua il logout</a></h3>";
    res.send(html);
})

router.get('/dashboard/magazzino', (req,res) =>{
    //res.render('magazzino');
    res.sendFile(path.join(__dirname, '../../app_magazzino/build', 'index.html'));
})

// API: per esempio, salvataggio prodotto
const products = [];

app.post('/api/prodotti', (req, res) => {
  const { name, location } = req.body;
  if (!name || !location) return res.status(400).json({ error: 'Dati mancanti' });
  const newProduct = { name, location };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.get('/api/prodotti', (req, res) => {
  res.json(products);
});

// Servire il frontend React su /prodotti
app.use(express.static(path.join(__dirname, '../app_magazzino/build')));

// Route fallback (React router)
app.get('/prodotti/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../app_magazzino/build', 'index.html'));
});

module.exports = router;