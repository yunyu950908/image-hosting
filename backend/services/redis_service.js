const Redis = require('ioredis');

const { redisSetting } = require('../config/setting');
const { redisLogger } = require('../utils/loggers/loggerGenerator');

const redis = new Redis(redisSetting);

redis.monitor((err, monitor) => {
  if (err) redisLogger.error(err);
  monitor.on('monitor', (time, args, source, database) => {
    const infoMeta = {
      args,
      database,
    };
    redisLogger.info(infoMeta);
  });
});

module.exports = redis;
