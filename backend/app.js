const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./services/mongoose_service');
require('./services/redis_service');
require('./services/mail_service');
const { appLogger } = require('./utils/loggers/loggerGenerator');
const httpErrorHandler = require('./middlewares/http_error_handler');
const errorHandler = require('./middlewares/error_handler');
const NotFoundError = require('./errors/resource_not_found_error');
const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// todo 临时处理，后续添加域名白名单
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// error handler
app.use((req, res, next) => {
  if (!req.headersSent) {
    next(new NotFoundError(req.method, req.path));
  }
});
app.use(httpErrorHandler());
app.use(errorHandler());

process.on('uncaughtException', (err) => {
  appLogger.error('uncaught exception error\n', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
  appLogger.error('unhandled rejection error\n', { reason, p });
  process.exit(1);
});


module.exports = app;
