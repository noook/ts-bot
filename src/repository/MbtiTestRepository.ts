import { EntityRepository, Repository } from 'typeorm';
import { MbtiTest, DiscordUser, MbtiAnswer } from '@/entity';
import { config } from '@/config';
import { orm } from '@/orm';

@EntityRepository(MbtiTest)
export class MbtiTestRepository extends Repository<MbtiTest> {

  public async currentTest(user: DiscordUser): Promise<MbtiTest | null> {
    try {
      return await this.findOneOrFail({
        user,
        completed: false,
      }, { relations: ['user'] });
    } catch (e) {
      return null;
    }
  }

  public async createTest(user: DiscordUser) {
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

  public async resetTest(test: MbtiTest): Promise<MbtiTest> {
    await this.remove(test);
    return this.createTest(test.user);
  }
}
