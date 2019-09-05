import { getCustomRepository } from 'typeorm';
import { MbtiTestRepository } from '@/repository';
import { DiscordUser, MbtiTest, MbtiAnswer } from '@/entity';
import { config } from '@/config';
import { orm } from '@/orm';
import EventHandler from '@/helper/event-handler';

class MbtiHelper {
  private testRepository: MbtiTestRepository;

  constructor() {
    EventHandler.ormReady(() => {
      this.testRepository = getCustomRepository(MbtiTestRepository);
    });
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
}

export default new MbtiHelper;
