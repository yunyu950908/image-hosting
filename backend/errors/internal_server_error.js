const HTTPBaseError = require('./http_base_error');
const ERROR_CODE = require('./error_code').InternalServerError;

class InternalServerError extends HTTPBaseError {
  constructor(errMsg) {
    super(500, '服务器开小差了~', ERROR_CODE, `something went wrong, ${errMsg}.`);
  }
}

module.exports = InternalServerError;
