class HTTPBaseError extends Error {
  constructor(httpStatusCode, httpMsg, errCode, errMsg) {
    super(`HTTP Error: ${errMsg}`);
    this.httpStatusCode = httpStatusCode;
    this.httpMsg = httpMsg;
    this.errCode = errCode;
  }
}

module.exports = HTTPBaseError;
