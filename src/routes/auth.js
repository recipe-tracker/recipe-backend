'use strict';

const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const User = require('../model/user/schema');
const auth = require('../../middleware/auth');

router.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then(user => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    })
    .catch(next);
});

router.post('/signin', auth(), (req,res,next) => {
  res.set('token', req.token);
  res.cookie('auth', req.token);
  res.send(req.token);
});

module.exports = router;
