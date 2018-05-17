const HTTPBaseError = require('./http_base_error');
const ERROR_CODE = require('./error_code').HTTPReqParamError;

/**
 * @param desc 描述，用于对用户展示
 * @param errMsg 信息，用于内部使用
 * @param paraName 字段名，内部使用
 * @param errCode 返回给客户端用的 code
 */

class HTTPReqParamError extends HTTPBaseError {
  constructor(desc, errMsg, paramName, errCode = ERROR_CODE) {
    super(200, desc, errCode, `${paramName} wrong, ${errMsg}.`);
    this.desc = desc;
    this.errMsg = errMsg;
  }
}

module.exports = HTTPReqParamError;
