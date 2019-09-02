
import { CommandoClient, CommandoMessage, Command } from 'discord.js-commando';
import { DiscordUserRepository } from '@/repository';
import { getCustomRepository } from 'typeorm';

export default class MBTIQuizCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'mbti',
      group: 'test',
      memberName: 'mbti',
      description: 'Starts an MBTI test',
      examples: ['!mbti'],
    });
  }

  async run(msg: CommandoMessage) {
    const userRepository = getCustomRepository(DiscordUserRepository);
    const user = await userRepository.updateOrCreate(msg.author);
    return msg.reply("I'm sending you the test in your DMs, follow the instructions !");
  }
};
