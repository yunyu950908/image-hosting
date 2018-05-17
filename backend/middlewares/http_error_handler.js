const HttpBaseError = require('../errors/http_base_error');

const { reqLogger } = require('../utils/loggers/loggerGenerator');
const { getErrorMeta } = require('../utils/loggers/logsMeta');
const apiRes = require('../utils/api_response');

function handler(options) {
  return function (err, req, res, next) {
    if (err instanceof HttpBaseError) {
      res.statusCode = err.httpStatusCode;
      res.code = err.errCode;
      res.msg = err.httpMsg;
      apiRes(req, res);
      // 打印错误日志
      const errMeta = getErrorMeta(err, req, res);
      reqLogger.error(`${err.message}\n`, errMeta);
    } else {
      next(err);
    }
  };
}

module.exports = handler;
