import 'module-alias/register';
import 'dotenv/config';
import "reflect-metadata";
import { join } from 'path';
import DBL from 'dblapi.js';
import { config } from '@/config';
import { initConnection } from '@/orm';
import Bot from './bot';

console.clear();
initConnection();

const bot = new Bot(config);
const dbl = new DBL(config.discordBotToken, bot);

dbl.on('posted', () => {
  console.log('Server count posted!');
});

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
});

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
