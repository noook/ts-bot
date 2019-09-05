require('dotenv').config();
const { config } = require('./dist/config');

const {
  driver: type,
  name: database,
  user: username,
  host,
  password,
  port,
} = config.db;

module.exports = {
  type,
  database,
  username,
  host,
  password,
  port,
  synchronize: false,
  logging: false,
  entities: [
    'dist/entity/**/*.js',
  ],
  migrations: [
    'dist/migration/**/*.js',
  ],
  subscribers: [
    'dist/subscriber/**/*.js',
  ],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
