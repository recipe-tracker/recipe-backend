'use strict';

const mongoose = require('mongoose');

const App = require('./src/app');

require('dotenv').config();

const MONGOOSE_URI = 'mongodb+srv://SamGnuschke:Samrea12@cluster0-s90so.mongodb.net/test?retryWrites=true&w=majority';

// Connection to mongoose DB
mongoose.connect(MONGOOSE_URI, { useNewUrlParser: true });

// Importing app.start from app.js. This will start the server when run.
App.start(process.env.PORT || 3000);