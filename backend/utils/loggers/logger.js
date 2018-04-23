const winston = require('winston');
const moment = require('moment');
require('winston-daily-rotate-file');

const logger = new winston.Logger({
  transports: [
    new winston.transports.DailyRotateFile({
      name: 'base_logger',
      filename: 'logs/info.log',
      prepend: false,
      datePattern: 'YYYY-MM-DD',
      level: 'info',
    }),
    new winston.transports.DailyRotateFile({
      name: 'error_logger',
      filename: 'logs/error.log',
      prepend: false,
      datePattern: 'YYYY-MM-DD',
      level: 'error',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(winston.transports.Console, {
    timestamp: () => moment(Date.now()).format('YYYY-MM-DD hh:mm:ss'),
  });
}

module.exports = logger;
