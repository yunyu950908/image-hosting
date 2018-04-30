const { appLogger } = require('../utils/loggers/loggerGenerator');

function handler(options) {
  return function (err, req, res, next) {
    const errMeta = {
      url: req.url,
      method: req.method,
      query: req.query,
      body: req.body,
      stack: err.stack,
    };
    appLogger.error('uncaught error in the middleware process\n', errMeta);
  };
}

module.exports = handler;
