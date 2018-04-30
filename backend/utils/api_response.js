const { reqLogger } = require('./loggers/loggerGenerator');

module.exports = (req, res) => {
  if (res.headersSent) {
    reqLogger.error(
      'error sending response: header already sent',
      { url: req.originalUrl },
    );
  } else {
    res.json({
      code: res.code || 0,
      msg: res.msg || '成功',
      data: res.data,
    });
  }
};
