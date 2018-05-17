const mongoose = require('mongoose');

const { mongoSetting } = require('../config/setting');
const { appLogger } = require('../utils/loggers/loggerGenerator');

const { uri } = mongoSetting;
mongoose.Promise = Promise;
mongoose.connect(uri)
  .catch(err => appLogger.error(`db connection error, uri: ${uri}\n`, err));

const db = mongoose.connection;

db.on('open', () => {
  appLogger.info(`db connected! uri: ${uri}`);
});

db.on('error', (err) => {
  appLogger.error(`db connection error, uri: ${uri}\n`, err);
});

module.exports = db;
