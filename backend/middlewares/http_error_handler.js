const HttpBaseError = require('../errors/http_base_error');

// const logger = require('../utils/loggers/logger');

function handler(options) {
  return function (err, req, res, next) {
    if (err instanceof HttpBaseError) {
      const errMeta = {
        httpStatusCode: err.httpStatusCode,
        httpMsg: err.httpMsg,
        errCode: err.errCode,
        errMsg: err.message,
        url: req.url,
        method: req.method,
        query: req.query,
        body: req.body,
        stack: err.stack,
      };
      console.log(errMeta);
      res.statusCode = err.httpStatusCode;
      res.json({
        errCode: err.errCode,
        errMsg: err.httpMsg,
      });
    } else {
      next(err);
    }
  };
}

module.exports = handler;
