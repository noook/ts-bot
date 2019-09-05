import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MbtiTest } from './MbtiTest';
import { Dichotomy } from '@/types/mbti';

@Entity()
export class MbtiAnswer {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => MbtiTest, test => test.answers, { onDelete: 'CASCADE' })
  test: MbtiTest;

  @Column()
  step: number;

  @Column({ nullable: true })
  value?: Dichotomy;

  @Column()
  question: number;
  
  constructor(test?: MbtiTest, step?: number, question?: number) {
    if (test && question && step) {
      this.test = test;
      this.step = step;
      this.question = question;
    }
  }
}
