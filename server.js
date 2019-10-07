const env = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const db = require('./db');

const path = require('path');

app.use(session({
    // store: "",
    secret: 'lobstercat',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 30 * 24 * 60 * 60 * 1000},
}));

// app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server is running on http://localhost:5000/")
});