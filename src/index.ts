import 'module-alias/register';
import 'dotenv/config';
import { join } from 'path';
import { config } from '@/config';
import Bot from './bot';

const bot = new Bot(config);
bot.registry
  .registerDefaultTypes()
  .registerGroups([
    ['quiz', 'Some quizzes'],
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
