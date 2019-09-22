import { EVENT } from '../types/events';
import { EventEmitter } from 'events';
import { Message } from 'discord.js';

const eventEmitter = new EventEmitter();

class EventHandler {
  public emit(event: EVENT, data?: any) {
    eventEmitter.emit(event, data);
  }

  public ormReady(cb: () => void) {
    eventEmitter.on(EVENT.ORM_READY, cb);
  }

  public questionSent(cb: (messaage: Message) => void) {
    eventEmitter.on(EVENT.QUESTION_SENT, cb);
  }
}

export default new EventHandler;
