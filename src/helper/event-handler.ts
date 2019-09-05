import { EVENT } from '../types/events';
import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

class EventHandler {
  public emit(event: EVENT, data?: any) {
    eventEmitter.emit(event, data);
  }

  public ormReady(cb: () => void) {
    eventEmitter.on(EVENT.ORM_READY, cb);
  }
}

export default new EventHandler;
