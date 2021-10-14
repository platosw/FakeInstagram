// Require Deps
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const indexController = require('./controllers/index');
const usersController = require('./controllers/users');
const expressSession = require('express-session');
const methodOverride = require('method-override');
// Initialize Express App
const app = express();
// Configure Settings
require('dotenv').config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on('connected', () => {
    console.log(`Connected to MongoDB`)
});

db.on('error', (error) => {
    console.log(`An Error Occurred with MongoDB ${error.message}`)
});

// Mount Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(expressSession({
    secret: process.env.SECRET, // this is used to digitally sign our session cookies (prevents forgery)
    resave: false, // this option updates session storage after request
    saveUninitialized: false
}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Mount Routes
app.use('/', indexController);
app.use('/users', usersController);


// Tell the App to Listen
app.listen(PORT, () => {
    console.log(`Connecting...${PORT}`)
});