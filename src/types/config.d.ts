export interface Config {
  env: string;
  token: string;
  discordBotToken: string;
  owner: string;
  prefix: string;
  db: {
    host: string;
    port: string;
    driver: string;
    name: string;
    user: string;
    password: string;
  },
  test: {
    length: number;
  },
}
