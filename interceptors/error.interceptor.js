const responseFactory = require('../factories/response.factory');
//

const errorInterceptor = (err, req, res, next) => {
  if(!err)
    return next();

  // If it is a validation error, return specific message
  if(err.message === 'validation error') {
    return res.status(400).json(responseFactory.fail(-10, err.errors[0].messages[0]));
  }

  if(err.message)
    return res.status(400).json(responseFactory.fail(-10, err.message));

  return res.status(400).json(responseFactory.fail(-10, "Ops. One unexpected error just happened. Please report this to us."));
};

module.exports = errorInterceptor;