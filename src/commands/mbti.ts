
import { CommandoClient, CommandoMessage, Command } from 'discord.js-commando';
import { getCustomRepository, AfterUpdate } from 'typeorm';
import { DiscordUserRepository } from '@/repository';
import MbtiHelper from '@/helper/mbti-helper';
import LocaleHelper from '@/helper/locale-helper';
import { Message } from 'discord.js';
import eventHandler from '@/helper/event-handler';
import { EVENT } from '@/types/events';

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

    const message = MbtiHelper.askQuestion(test, msg.author);

    return msg.reply(message)
      .then((sent: Message) => {
        eventHandler.emit(EVENT.QUESTION_SENT, sent);
        return sent;
      });
  }
};
