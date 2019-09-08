import { MessageEmbed, User, MessageReaction } from 'discord.js';
import { getCustomRepository } from 'typeorm';
import { MbtiTestRepository } from '@/repository';
import { DiscordUser, MbtiTest, MbtiAnswer } from '@/entity';
import { config } from '@/config';
import { orm } from '@/orm';
import EventHandler from '@/helper/event-handler';
import Translator, { TranslatorLangs } from '@/translations';

export enum MbtiEmojiAnswer {
  KIWI = '🥝',
  WATERMELOON = '🍉',
  APPLE = '🍎',
  PEACH = '🍑',
  PINEAPPLE = '🍍',
  BANANA = '🍌',
  COCONUT = '🥥',
  CHERRY = '🍒',
}

enum TestActions {
  RESET = '🗑',
  RESUME = '➡',
}

type EmojiToAction = {
  [key in TestActions]: string;
}

class MbtiHelper {
  private testRepository: MbtiTestRepository;

  private actions: EmojiToAction = {
    '🗑': 'reset',
    '➡': 'resume',
  }

  constructor() {
    EventHandler.ormReady(() => {
      this.testRepository = getCustomRepository(MbtiTestRepository);
    });
  }

  public isAnswerValid(emoji: string): boolean {
    return Object.values(MbtiEmojiAnswer).includes(emoji as MbtiEmojiAnswer);
  }

  public createTest(user: DiscordUser): Promise<MbtiTest> {
    return this.testRepository.createTest(user);
  }

  public currentTest(user: DiscordUser) {
    return this.testRepository.currentTest(user);
  }

  public async resetOrResume(user: User, test: MbtiTest): Promise<MbtiTest> {
    const locale = test.user.locale;
    const embed = new MessageEmbed()
      .setTitle(Translator.trans(TranslatorLangs[locale], 'mbti.testAlreadyStartedTitle'))
      .setDescription(Translator.trans(TranslatorLangs[locale], 'mbti.testAlreadyStarted'))
      .setColor('#a55eea')
      .setFooter('mbti-resume-test');

    const message = await user.send(embed);
    const actions = Object.values(TestActions);

    for (let i = 0; i < actions.length; i += 1) {
      await message.react(actions[i]);
    }

    const filter = (reaction: MessageReaction, user: User) => {
      return !user.bot && actions.includes(reaction.emoji.name as TestActions);
    }

    const action: string = await message.awaitReactions(filter, { max: 1 })
      .then(collected => this.actions[collected.entries().next().value[0]])
      .catch(err => console.error);

    switch (action) {
      case 'resume':
        return test;
    
      case 'reset':
        return this.testRepository.resetTest(test);
    }
  }
}

export default new MbtiHelper;
