import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'discord.js';
import { DiscordUser } from './DiscordUser';
import { MbtiAnswer } from './MbtiAnswer';

@Entity()
export class MbtiTest {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => DiscordUser, user => user.tests)
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

  @Column()
  completedAt?: Date;

  @OneToMany(type => MbtiAnswer, answer => answer.test, { cascade: true, onDelete: 'CASCADE' })
  answers: MbtiAnswer[];

  constructor(user: DiscordUser) {
    // this.user = user;
    this.step = 1;
    this.completed = false;
  }

}
