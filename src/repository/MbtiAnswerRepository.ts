import { EntityRepository, Repository } from 'typeorm';
import { MbtiAnswer } from '@/entity';

@EntityRepository(MbtiAnswer)
export class MbtiAnswerRepository extends Repository<MbtiAnswer> {
}
