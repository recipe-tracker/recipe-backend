'use strict';

// dependencies are imported

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Middlewares are imported
const notFound = require('../middleware/not-found');
const errorHandler = require('../middleware/server-error');

const apiRouter = require('./routes/api-router');
const authRouter = require('../src/routes/auth');

// Powering up app


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Allows me to use JSDocs
app.use('/docs', express.static('docs'));


app.use(apiRouter);
app.use(authRouter);
app.use('*',notFound);
app.use(errorHandler);



module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`If you are seeing this message the server is up on ${port}`);
    });
  },
};