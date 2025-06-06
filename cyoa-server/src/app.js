require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const routes = require('./routes');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const clientOrigin = isProduction
  ? process.env.CLIENT_ORIGIN_PROD
  : process.env.CLIENT_ORIGIN_DEV;

app.use(cors({
  origin: clientOrigin,
  credentials: true
}));


app.use(express.json());

app.use(session ({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: null
    }
}));

app.use('/', routes);


module.exports = app;