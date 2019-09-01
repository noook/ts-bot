import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MbtiTest } from './MbtiTest';
import { Dichotomy } from '@/types/mbti';

@Entity()
export class MbtiAnswer {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => MbtiTest)
  test: MbtiTest;

  @Column()
  step: number;

  @Column({ nullable: true })
  value?: Dichotomy;

  @Column()
  question: number;

  // constructor(test: MbtiTest, question: number) {
  //   this.test = test;
  //   this.question = question;
  // }
}
