const HTTPBaseError = require('./http_base_error');
const ERROR_CODE = require('./error_code').ResourceNotFoundError;

class ResourceNotFoundError extends HTTPBaseError {
  constructor(resourceName, resourceId) {
    super(404, '资源不存在', ERROR_CODE, `${resourceName} not found, id ${resourceId}.`);
  }
}

module.exports = ResourceNotFoundError;
