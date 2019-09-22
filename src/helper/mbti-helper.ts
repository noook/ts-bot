import { MessageEmbed, User, MessageReaction, Message } from 'discord.js';
import { getCustomRepository } from 'typeorm';
import { MbtiTestRepository } from '@/repository';
import { DiscordUser, MbtiTest, MbtiAnswer } from '@/entity';
import { config } from '@/config';
import { orm } from '@/orm';
import EventHandler from '@/helper/event-handler';
import Translator, { TranslatorLangs } from '@/translations';
import { HandlerColor } from './reaction-helper';
import { shuffle } from '@/utils';
import eventHandler from '@/helper/event-handler';

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

  /**
   * @todo Split ask / answer
   * @todo Map emoji to MbtiAnswer -> recursive askQuestion
   */
  public askQuestion(test: MbtiTest, user: User) {
    const [left, right] = shuffle(Object.values(MbtiEmojiAnswer));
    const questions = Translator.trans(TranslatorLangs.FR, `mbtiQuestion.${test.step}`) as any;
    const embed = new MessageEmbed()
      .setColor(HandlerColor.MBTI_ANSWER)
      .setFooter('mbti-question')
      .setTitle('Question ' + test.step)
      .addField(left, questions.left)
      .addField(right, questions.right);

    eventHandler.questionSent(async (msg: Message) => {
      await msg.react(left);
      await msg.react(right);
      const filter = (reaction: MessageReaction, user: User) => {
        return !user.bot && [left, right].includes(reaction.emoji.name as MbtiEmojiAnswer);
      }

      const answer = await msg.awaitReactions(filter, { max: 1 })
        .then(collected => collected.entries().next().value[0])
        .catch(err => console.error);
      console.log(answer);
    });

    return embed;
  }

  public async answerQuestion(reaction: MessageReaction, user: User) {
    // console.log(reaction, user);
  } 
}

export default new MbtiHelper;
