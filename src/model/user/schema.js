'use strict'

const mongoose  = require('mongoose-schema-jsonschema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'foobar';

//  What data/functionality does our user model have
//  UserName, Password, and Role

const User = mongoose.Schema({
  user: { type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, default: 'user', enum: ['admin', 'editor', 'user']},
});

const capabilities = {
  admin : ['create', 'read', 'update', 'delete'],
  editor: ['create', 'read', 'update'],
  user: ['read']
}

// Pre-hooks (pre-save, password hashing)

user.pre('save', async function (){
  if(this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    // missing lines of code go back to old labs

  }
});

user.statics.authenticateToken = function (token) {

  if(usedTokens.has(token)) {
    return Promise.reject('Invalid Token');
  }

  try {
    let parsedToken = 
    }
  }
      // missing lines of code go back to old labs
};

user.methods.generateToken = function (type) {

  let token = {
    id: this._id,
    capabilities: capabilities[this.role],
    type: type || 'user',
  }
  let options = {
    // missing lines of code go back to old labs

  }
}

// ********  Auth ************

// Token validation

// Generating tokens

// Basic Auth
// Bearer Auth

module.exports = mongoose.model('User', user);
