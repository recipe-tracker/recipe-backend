module.exports = (request, response, next) => {
  // const modelName = request.params.model;
  request.model = require('../src/${modelName}');
  next();
};
