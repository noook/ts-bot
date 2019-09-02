import 'dotenv/config';
import 'module-alias/register';
import LoadQuestionsCommand from './load-questions';
import CommandPool from './base-command';

const pool = new CommandPool();

pool.register([
  new LoadQuestionsCommand(),
]);

const [command, ...args] = process.argv.slice(2);

pool.run(command, args);
