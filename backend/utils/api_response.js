const { reqLogger } = require('./loggers/loggerGenerator');

module.exports = (req, res) => {
  debugger;
  if (res.headersSent) {
    reqLogger.error(
      'error sending response: header already sent',
      { url: req.originalUrl },
    );
  } else {
    const successMeta = {
      url: req.url,
      query: JSON.stringify(req.query),
      body: JSON.stringify(req.body),
      code: res.code,
      msg: res.msg,
      data: JSON.stringify(res.data),
    };
    reqLogger.info('respond success\n', successMeta);
    res.json({
      code: res.code || 0,
      msg: res.msg || '成功',
      data: res.data,
    });
  }
};
