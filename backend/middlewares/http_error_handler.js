const HttpBaseError = require('../errors/http_base_error');

const logger = require('../utils/loggers/logger');

function handler(options) {
  return function (err, req, res, next) {
    if (err instanceof HttpBaseError) {
      const errMeta = {
        httpStatusCode: err.httpStatusCode,
        httpMsg: err.httpMsg,
        errCode: err.errCode,
        url: req.url,
        method: req.method,
        query: JSON.stringify(req.query),
        body: JSON.stringify(req.body),
        // stack: err.stack,
      };
      logger.error(`${err.message}\n`, errMeta);
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
