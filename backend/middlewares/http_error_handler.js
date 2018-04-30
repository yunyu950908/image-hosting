const HttpBaseError = require('../errors/http_base_error');

const { reqLogger } = require('../utils/loggers/loggerGenerator');
const apiRes = require('../utils/api_response');

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
      reqLogger.error(`${err.message}\n`, errMeta);
      res.statusCode = err.httpStatusCode;
      res.code = err.errCode;
      res.msg = err.httpMsg;
      apiRes(req, res);
    } else {
      next(err);
    }
  };
}

module.exports = handler;
