import * as cacheManagerRedisStore from 'cache-manager-redis';

export default {
  store: cacheManagerRedisStore,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  db: 0,
};
