import { createConnection, Connection } from 'typeorm';
import EventHandler from '@/helper/event-handler';
import { EVENT } from '@/types/events';

let orm: Connection;

export function initConnection(): Promise<Connection> {
  return createConnection()
    .then((conn: Connection) => {
      orm = conn;
      EventHandler.emit(EVENT.ORM_READY);
      return conn;
    })
    .catch((err: Error) => {
      throw err;
    });
}

export {
  orm,
};
