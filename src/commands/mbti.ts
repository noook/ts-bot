
import { CommandoClient, CommandoMessage, Command } from 'discord.js-commando';

export default class MBTIQuizCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'mbti',
      group: 'quiz',
      memberName: 'mbti',
      description: 'Starts an MBTI test',
      examples: ['!mbti'],
    });
  }

  async run(msg: CommandoMessage) {
    return msg.reply("I'm sending you the test in your DMs, follow the instructions !");
  }
};
