import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { DiscordUser } from './DiscordUser';
import { MbtiAnswer } from './MbtiAnswer';

@Entity()
export class MbtiTest {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => DiscordUser, user => user.tests, { onDelete: 'CASCADE' })
  user: DiscordUser;

  @Column()
  step: number;

  @Column()
  completed: boolean;

  @Column({ nullable: true })
  result?: string;

  @Column({ nullable: true })
  e?: number;

  @Column({ nullable: true })
  i?: number;

  @Column({ nullable: true })
  n?: number;

  @Column({ nullable: true })
  s?: number;

  @Column({ nullable: true })
  t?: number;

  @Column({ nullable: true })
  f?: number;

  @Column({ nullable: true })
  j?: number;

  @Column({ nullable: true })
  p?: number;

  @Column({ nullable: true })
  completedAt?: Date;

  @OneToMany(type => MbtiAnswer, answer => answer.test)
  answers: MbtiAnswer[];

  constructor(user?: DiscordUser) {
    if (user) {
      this.user = user;
      this.step = 1;
      this.completed = false;
    }
  }

  currentTest(): MbtiAnswer | null {
    if (this.answers === undefined) return null;
    return this.answers.find(answer => answer.step === this.step);
  }
}
