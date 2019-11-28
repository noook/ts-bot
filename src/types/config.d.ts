export interface Config {
  env: string;
  db: {
    host: string;
    port: string;
    driver: string;
    name: string;
    user: string;
    password: string;
  },
}
