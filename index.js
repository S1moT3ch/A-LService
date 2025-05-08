const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const checkUserLogin = require('./app/middleware/check-user-login');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//const MagApp = require('./app');

const app = express();
app.use(cors({
  origin: 'https://al-management.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));
app.options('https://al-management.vercel.app', cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
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
      resave: false,
      saveUninitialized: false,
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(loginRouter);
app.use('/user', checkUserLogin(), userRouter);
app.use(magRouter);