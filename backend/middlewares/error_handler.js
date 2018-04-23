function handler(options) {
  return function (err, req, res, next) {
    const errMeta = {
      url: req.url,
      method: req.method,
      query: req.query,
      body: req.body,
      stack: err.stack,
    };
    console.log('uncaught error in the middleware process', errMeta);
  };
}

module.exports = handler;
