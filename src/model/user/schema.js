'use strict'

const mongoose  = require('mongoose-schema-jsonschema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'foobar';

//  What data/functionality does our user model have
//  UserName, Password, and Role

const User = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: {type: String, required: true},
  role: {type: String, default: 'user', enum: ['admin', 'editor', 'user']},
});

// This is what each user can do based on their assigned role
const capabilities = {
  admin : ['create', 'read', 'update', 'delete'],
  editor: ['create', 'read', 'update'],
  user: ['read']
};

// Pre-hooks (pre-save, password hashing)

user.pre('save', async function (){
  if( this.isModified( 'password' )) {
    this.password = await bcrypt.hash( this.password, 10 );
  }
});

// All of my auth (Basic, Bearer , Validation)

user.statics.authenticateToken = function ( token ) {

  if(usedTokens.has(token)) {
    return Promise.reject( 'Invalid Token' );
  }
  try {
    let parsedToken = jwt.verify( token, SECRET );
    return this.findOne( query );
    } catch ( e ) { throw new Error( 'invalid Token' );}
};

// Basic Auth (username and password)
user.statics.authenticateBasic = function( auth ) {
  let query = { username: auth.username };
  return this.findOne( query )
    .then(user => user && user.comparePassword( auth.password ))
    .catch(error => { throw error; });
};

//  Checking the password is the same as the stored password when logging in
user.method.comparePassword = function ( password ) {
  return bcrypt.compare( password, this.password )
    .then( valid => valid ? this : null);
};

//  When you log in or signup user is given a token that will allow them to do actions without logging in again for set time
user.methods.generateToken = function ( type ) {

  let token = {
    id: this._id,
    capabilities: capabilities[ this.role ],
    type: type || 'user',
  }
  // Not using this for now keeping for future ref
  // let options = {}
  return jwt.sign( token, SECRET );
};

//  Checking what capability a user has
user.methods.can = function ( capability ) {
  return capabilities[ this.role ].includes(capability);
};

module.exports = mongoose.model( 'User', user );
