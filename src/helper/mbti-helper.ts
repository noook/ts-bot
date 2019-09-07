import { MessageEmbed, Emoji } from 'discord.js';
import { getCustomRepository } from 'typeorm';
import { MbtiTestRepository } from '@/repository';
import { DiscordUser, MbtiTest, MbtiAnswer } from '@/entity';
import { config } from '@/config';
import { orm } from '@/orm';
import EventHandler from '@/helper/event-handler';

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

class MbtiHelper {
  private testRepository: MbtiTestRepository;

  constructor() {
    EventHandler.ormReady(() => {
      this.testRepository = getCustomRepository(MbtiTestRepository);
    });
  }

  public isAnswerValid(emoji: string): boolean {
    return Object.values(MbtiEmojiAnswer).includes(emoji as MbtiEmojiAnswer);
  } 

  public async createTest(user: DiscordUser): Promise<MbtiTest> {
    const test = new MbtiTest(user);
    const collector: (MbtiAnswer | MbtiTest)[] = [];
    // shuffling questions
    const indexes = Array(config.test.length)
      .fill(undefined)
      .map((value, index) => index + 1)
      .sort(() => Math.random() - 0.5);

    collector.push(test);
    indexes.forEach((id: number, index: number) => {
      collector.push(new MbtiAnswer(test, index + 1, id));
    });

    await orm.manager.save(collector);

    return test;
  }

  public currentTest(user: DiscordUser) {
    return this.testRepository.currentTest(user);
  }

  /**
   * @todo
   */
  public resetOrResume(test: MbtiTest) {
  }
}

export default new MbtiHelper;
