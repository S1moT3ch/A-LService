const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();

// Serve i file statici generati da React
router.use(express.static(path.join(__dirname, '../../my-app/build')));

// Per tutte le rotte non API, ritorna index.html
router.get('/user/dashboard/magazzino', (req, res) => {
  res.sendFile(path.join(__dirname, '../../my-app/build', 'index.html'));
});

module.exports = router;