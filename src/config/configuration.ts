import dbConfig from './database.config';

export default () => ({
  port: process.env.API_PORT,
  api_prefix: process.env.API_PREFIX || '/api/v1',
  database: dbConfig,
});
