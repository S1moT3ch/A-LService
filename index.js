const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const checkUserLogin = require('./app/middleware/check-user-login');
const mongoose = require('mongoose');
require('dotenv').config();

//const MagApp = require('./app');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // <-- AGGIUNGI QUESTO
const port = process.env.PORT || 3000;

/* Router */
const loginRouter = require('./app/routes/login');
const userRouter = require('./app/routes/user');
const magRouter = require('./app/routes/magazzino');

app.listen(port, () => {console.log('Server in ascolto alla porta ' + port)})

app.set('views', './app/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/app/public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'chiaveSegreta123',
    saveUninitialized: false,
    resave: false
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(loginRouter);
app.use('/user', checkUserLogin(), userRouter);
app.use(magRouter);