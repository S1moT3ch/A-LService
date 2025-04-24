const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const router = express.Router();

  const app = express();
  app.use(express.json());

  app.use('/api/pezzi', require('./routes/pezzi'));
  app.use('/api/locazioni', require('./routes/locazioni'));

  // Serve React build
  router.use('/user/dashboard/magazzino', express.static(path.join(__dirname, './my-app/build')));
  router.get('/user/dashboard/magazzino/', (req, res) => {
    res.sendFile(path.join(__dirname, '.my-app/build/index.html'));
  });

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
module.exports = express;