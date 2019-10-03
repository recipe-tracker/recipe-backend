'use strict';

const express = require('express');

//  Bringing Express in above and creating a router below

// eslint-disable-next-line new-cap
const apiRouter = express.Router();

// Handler functions (3 more to go)

function handleGet(request, response, next) {
  if (request) {
    return response.send('HELP IVE FALLEN AND I CANT GET UP. (But get request is working!!)')
      .then(response.status(200))
      .catch((error) => next(error));
  }
}

apiRouter.get('/', handleGet);

module.exports = apiRouter;
