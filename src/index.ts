import 'module-alias/register';
import 'dotenv/config';
import "reflect-metadata";
import { join } from 'path';
import { config } from '@/config';
import { initConnection } from '@/orm';
import Bot from './bot';

console.clear();
initConnection();
const bot = new Bot(config);

bot.registry
  .registerDefaultTypes()
  .registerGroups([
    ['test', 'MBTI Test'],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    commandState: false,
    unknownCommand: false,
    eval: false,
  })
  .registerCommandsIn(join(__dirname, 'commands'));

try {
  bot.start();
} catch (e) {
  console.error(e);
}
