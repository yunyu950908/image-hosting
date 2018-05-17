const HTTPBaseError = require('./http_base_error');
const ERROR_CODE = require('./error_code').ResourceNotFoundError;

class ResourceNotFoundError extends HTTPBaseError {
  constructor(path) {
    super(404, '资源不存在', ERROR_CODE, `resource not found, path ${path}.`);
  }
}

module.exports = ResourceNotFoundError;
