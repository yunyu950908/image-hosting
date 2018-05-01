const { appLogger } = require('../utils/loggers/loggerGenerator');
const { getErrorMeta } = require('../utils/loggers/logsMeta');
const apiRes = require('../utils/api_response');
const ErrorCode = require('../errors/error_code');

function handler(options) {
  return function (err, req, res, next) {
    if (err instanceof SyntaxError) {
      res.statusCode = 400;
    }
    res.code = ErrorCode.SystemError;
    res.msg = '系统错误';
    apiRes(req, res);
    // 打印错误日志
    const errMeta = getErrorMeta(err, req, res);
    appLogger.error('uncaught error in the http error handler middleware\n', errMeta);
  };
}

module.exports = handler;
