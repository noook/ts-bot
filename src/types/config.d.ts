export interface Config {
  env: string;
  token: string;
  owner: string;
  prefix: string;
  db: {
    client: string;
    name: string;
    user: string;
    password: string;
  }
}
