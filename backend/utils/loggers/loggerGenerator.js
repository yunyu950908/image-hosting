const winston = require('winston');
const moment = require('moment');
require('winston-daily-rotate-file');

const { loggerSetting } = require('../../config/setting');

const loggerGenerator = (dirname) => {
  const loggerInstance = new winston.Logger({
    transports: [
      new winston.transports.DailyRotateFile({
        name: 'base_logger',
        filename: `${loggerSetting.logsPath}/${dirname}/%DATE%.info.log`,
        datePattern: 'YYYY-MM-DD',
        level: 'info',
        timestamp: true,
      }),
      new winston.transports.DailyRotateFile({
        name: 'error_logger',
        filename: `${loggerSetting.logsPath}/${dirname}/%DATE%.error.log`,
        datePattern: 'YYYY-MM-DD',
        level: 'error',
        timestamp: true,
      }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    loggerInstance.add(winston.transports.Console, {
      timestamp: () => moment(Date.now()).format('YYYY-MM-DD hh:mm:ss'),
    });
  }
  return loggerInstance;
};

const appLogger = loggerGenerator('app');
const reqLogger = loggerGenerator('req');
const redisLogger = loggerGenerator('redis');


module.exports = {
  appLogger,
  reqLogger,
  redisLogger,
};
