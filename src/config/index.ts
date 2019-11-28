import { Config } from 'types/config';

export const config: Config = {
  env: process.env.NODE_ENV,
  db: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    driver: process.env.DB_DRIVER,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};