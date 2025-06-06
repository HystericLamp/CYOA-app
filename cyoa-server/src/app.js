require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const session = require('express-session')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes);
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

module.exports = app;