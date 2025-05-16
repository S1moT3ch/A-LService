const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const router = express.Router();
router.use(cookieParser());
const passport = require('../config/passport-config');
const { MongoDBCollectionNamespace } = require('mongodb');
const fs = require('fs');
const path = require('path');
let nome;


router.get('/login', (req, res) => {
    if(req.isAuthenticated()) return res.redirect('/user/dashboard');
    res.render('login');
    
})

router.get('/login/error=true', (req, res) => {
  res.render('login');
})


router.post('/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.redirect('/login/error=true'); // stesso comportamento di failureRedirect
      req.logIn(user, (err) => {
        if (err) return next(err);
  
        // Leggi il file JSON
        const filePath = path.join(__dirname, '../json/temp.json');
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            console.error("Errore lettura file:", err);
            return res.redirect('/login');
          }
  
          
          try {
            nome = JSON.parse(data);
            const username = nome.username;

            res.cookie('username', username, {
              maxAge: 3600000,
              httpOnly: false,
              secure: true,
              sameSite: 'None',
              path: '/'
            });

              return res.status(200).json({
              success: true,
              message: 'Login riuscito',
              username: username
              });

            } catch (parseErr) {
              return res.status(500).json({ success: false, message: 'Errore parsing JSON' });
            }
          });
      });
    })(req, res, next);
  });

  router.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) { return res.status(500).json({ message: 'Errore durante il logout' }); }
      res.clearCookie('connect.sid'); // Se stai usando un cookie di sessione, puoi rimuoverlo
      res.status(200).json({ message: 'Logout effettuato con successo' });
    });
  });


  router.get('/api/check-auth', (req, res) => {
    if (req.isAuthenticated()) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });

//router.get('*', (req, res) => {
  //res.render('home');
//})

router.get('/user-info', (req, res) => {
  const username = req.cookies.username;
  if (username) {
    res.json({ username });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});


module.exports = router;