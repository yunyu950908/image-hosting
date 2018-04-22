const HTTPBaseError = require('./http_base_error');
const ERROR_CODE = require('./error_code').HTTPReqParamError;

/**
 * @param desc 描述，用于对用户展示
 * @param errMsg 信息，用于内部使用
 * @param paraName 字段名，内部使用
 */

class HTTPReqParamError extends HTTPBaseError {
  constructor(desc, errMsg, paramName) {
    super(200, desc, ERROR_CODE, `${paramName} wrong, ${errMsg}.`);
    this.desc = desc;
    this.errMsg = errMsg;
  }
}

module.exports = HTTPReqParamError;
