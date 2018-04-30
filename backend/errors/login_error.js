const HttpBaseError = require('./http_base_error');

const ERROR_CODE = require('./error_code').LoginError;

class LoginError extends HttpBaseError {
  constructor(httpMsg, errMsg, errCode = ERROR_CODE) {
    super(200, httpMsg, errCode, errMsg);
  }
}

module.exports = LoginError;
