const express = require('express');
//const app= express;
const router = express.Router();



router.get('/dashboard/', (req, res) => {
    const html = "<h3><a href='/logout'>Effettua il logout</a></h3>";
    res.render('dashboard');
})

router.get('/dashboard-2', (req,res) =>{
    const html = "<h3><a href='/logout'>Effettua il logout</a></h3>";
    res.send(html);
})

module.exports = router;