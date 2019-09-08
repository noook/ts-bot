
import { CommandoClient, CommandoMessage, Command } from 'discord.js-commando';
import { getCustomRepository } from 'typeorm';
import { DiscordUserRepository } from '@/repository';
import MbtiHelper from '@/helper/mbti-helper';
import LocaleHelper from '@/helper/locale-helper';
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
    let user = await userRepository.updateOrCreate(msg.author);

    if (!user.locale) {
      await LocaleHelper.askLocale(msg.author);
      user = await userRepository.findOne(user.id);
    }

    let test = await MbtiHelper.currentTest(user);

    test = null === test ?  await MbtiHelper.createTest(user) : await MbtiHelper.resetOrResume(msg.author, test);

    return msg.reply(Translator.trans(TranslatorLangs[user.locale], 'common.hello', { name: 'Neil' }));
  }
};
