import { Config } from 'types/config';

export const config: Config = {
  env: process.env.NODE_ENV,
  token: process.env.DISCORD_TOKEN,
  owner: process.env.BOT_OWNER,
  prefix: process.env.BOT_PREFIX,
  db: {
    client: process.env.DB_CLIENT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};