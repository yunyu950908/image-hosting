const HTTPBaseError = require('./http_base_error');
const ERROR_CODE = require('./error_code').NoAuthError;

class NoAuthError extends HTTPBaseError {
  constructor(httpMsg, errMsg) {
    super(401, `服务器鉴权失败，${httpMsg}`, ERROR_CODE, `no auth, ${errMsg}`);
  }
}

module.exports = NoAuthError;
