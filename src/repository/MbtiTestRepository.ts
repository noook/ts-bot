import { EntityRepository, Repository } from 'typeorm';
import { MbtiTest, DiscordUser } from '@/entity';

@EntityRepository(MbtiTest)
export class MbtiTestRepository extends Repository<MbtiTest> {

  public async currentTest(user: DiscordUser): Promise<MbtiTest | null> {
    try {
      return await this.findOneOrFail({
        user,
        completed: false,
      });
    } catch (e) {
      return null;
    }
  }
}
