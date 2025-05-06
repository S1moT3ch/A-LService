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
            res.cookie('username', nome, {
              maxAge: 3600000, // Tempo di vita del cookie in millisecondi (1 ora in questo caso)
              httpOnly: false,  // Per impedire che JavaScript acceda al cookie
              secure: false    // Impostato su true solo se il sito è in HTTPS
            });

          } catch (parseErr) {
            console.error("Errore parsing JSON:", parseErr);
            return res.redirect('/login');
          }
  
          return res.redirect('/user/dashboard/nome=' + nome.username);
        });
      });
    })(req, res, next);
  });

router.get('/logout', (req,res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
      });
});

//router.get('*', (req, res) => {
  //res.render('home');
//})


module.exports = router;