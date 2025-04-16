const express = require('express');
const router = express.Router();




router.get('/dashboard', (req, res) => {
    const html = "<h3><a href='/logout'>Effettua il logout</a></h3>";
    res.render('uDashboard.jade', {title: "test", message: "Ciao"})
    //res.render('dashboard');
})

router.get('/dashboard-2', (req,res) =>{
    const html = "<h3><a href='/logout'>Effettua il logout</a></h3>";
    res.send(html);
})

module.exports = NomeBenvenuto;
module.exports = router;