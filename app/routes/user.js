const express = require('express');
const app= express();
const router = express.Router();
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../json/temp.json');

app.use('/user/dashboard/magazzino', express.static(path.join(__dirname, '../../my-app/build')));

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
  res.sendFile(path.join(__dirname, '../../my-app/build', 'index.html'));
    //res.render('magazzino');
})

module.exports = router;