
import { CommandoClient, CommandoMessage, Command } from 'discord.js-commando';
import { getCustomRepository } from 'typeorm';
import { DiscordUserRepository } from '@/repository';
import MbtiHelper from '@/helper/mbti-helper';
import Translator, { TranslatorLangs } from '@/translations';

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
    await MbtiHelper.createTest(user);
    return msg.reply(Translator.trans(TranslatorLangs.FR, 'common.hello', { name: 'Neil' }));
  }
};
