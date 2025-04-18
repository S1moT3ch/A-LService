const express = require('express');
const router = express.Router();
const passport = require('../config/passport-config');
const { MongoDBCollectionNamespace } = require('mongodb');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../json/temp.json');
var nome = JSON.parse(fs.readFileSync(filePath, 'utf8'));

router.get('/login', (req, res) => {
    if(req.isAuthenticated()) return res.redirect('/user/dashboard');
    res.render('login');
    
})

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/user/dashboard/nome='+nome.username,
    failureRedirect: '/login'
}));

router.get('/logout', (req,res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
      });
});

module.exports = router;