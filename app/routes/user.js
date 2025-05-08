const express = require('express');
const app= express();
app.use(express.json());
const router = express.Router();
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../json/temp.json');
const authMiddleware = require('../middleware/check-user-login');


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
  
router.get('/user/dashboard', authMiddleware, (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Non autorizzato' });
  }
  // Se l'utente è autenticato, continua e restituisci i dati
  res.status(200).json({ message: 'Benvenuto alla dashboard!' });
});


router.get('/dashboard-2', (req,res) =>{
    const html = "<h3><a href='/logout'>Effettua il logout</a></h3>";
    res.send(html);
})


module.exports = router;