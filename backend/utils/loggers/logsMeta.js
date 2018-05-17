const ErrorCode = require('../../errors/error_code');

const getReqMeta = req => ({
  protocol: req.protocol,
  hostname: req.hostname,
  url: req.url,
  method: req.method,
  query: JSON.stringify(req.query),
  body: JSON.stringify(req.body),
});

const getResMeta = res => ({
  code: res.code,
  msg: res.message,
  data: JSON.stringify(res.data),
});

const getErrorMeta = (err, req, res) => {
  const reqMeta = getReqMeta(req);
  const resMeta = getResMeta(res);
  const errorMeta = {
    ...reqMeta,
    ...resMeta,
    statusCode: err.httpStatusCode || res.statusCode,
    errType: err.constructor.name,
  };
  if (res.code === ErrorCode.SystemError) errorMeta.stack = err.stack;
  return errorMeta;
};

const getSuccessMeta = (req, res) => {
  const reqMeta = getReqMeta(req);
  const resMeta = getResMeta(res);
  return Object.assign({}, reqMeta, resMeta);
};

module.exports = {
  getErrorMeta,
  getSuccessMeta,
};
