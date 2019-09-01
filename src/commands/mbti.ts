
import { CommandoClient, CommandoMessage, Command } from 'discord.js-commando';
import { DiscordUser } from '@/entity';
import { orm } from '@/orm';

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
    const user = new DiscordUser(msg.author);
    console.log(user);
    console.log(orm);
    return msg.reply("I'm sending you the test in your DMs, follow the instructions !");
  }
};
