import { EntityRepository, Repository } from 'typeorm';
import { MbtiTest } from '@/entity';

@EntityRepository(MbtiTest)
export class MbtiTestRepository extends Repository<MbtiTest> {
}
