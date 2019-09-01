import { createConnection, Connection } from 'typeorm';

let orm: Connection;

export function initConnection(): Promise<Connection> {
  return createConnection()
    .then((conn: Connection) => {
      orm = conn;
      return conn;
    })
    .catch((err: Error) => {
      throw err;
    });
}

export {
  orm,
};
