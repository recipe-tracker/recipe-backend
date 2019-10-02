'use strict'

const User = require('../src/model/user/schema');

module.exports = (capability) => {

  return (req, res, next) => {

    try {
      let [ authType, authString ] = req.headers.authorization.split( /\s+/ );

      switch ( authType.toLowerCase() ) {
        case 'basic':
          return _authBasic( authString );
        case 'bearer':
          return _authBearer( authString );
        default:
          return _authError();
      }
    } catch(e){
      _authError( e );
    }
  
  function _authBasic(str) {
      let base64Buffer = Buffer.from(str, 'base64');
      let bufferString = base64Buffer.toString();
      let [username, password] = bufferString.split(':');
      let auth = {username, password};
          // missing lines of code go back to old labs
      return User.authticateBasic(auth)
        .then(user => _authenticate(user))
        .catch(_authError);
    }
  
  function _authBearer(authstring) {

  }
  
  function _authenticate(user) {
    if (user && (!capability || (user.can(capability)))) {
      req.use
    }
  }

  function  authError(){

  }

}