'use strict';

// dependencies are imported

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Middlewares are imported
const notFound = require('../middleware/404');
const errorHandler = require('../middleware/500');

const apiRouter = require('./routes/api-router');

// Powering up app

const app = express();
app.use(apiRouter);


app.use(cors());
app.use(morgan('dev'));

// Allows me to use JSDocs
app.use('/docs', express.static('docs'));

app.use(notFound);
app.use(errorHandler);



module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`If you see this message the server is up on ${port}`);
    });
  },
};