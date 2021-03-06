import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Dichotomy, IndexedQuestion, QuestionPosition } from '@/types/mbti';

@Entity()
export class MbtiQuestion {

  constructor(data?: IndexedQuestion) {
    if (data) {
      this.number = data.index;
      this.key = data.position;
      this.value = data.value;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column()
  key: QuestionPosition;

  @Column()
  value: Dichotomy;
}
