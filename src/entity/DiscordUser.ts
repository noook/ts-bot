import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MbtiTest } from './MbtiTest';
import { User } from 'discord.js';

@Entity()
export class DiscordUser {

  constructor(user?: User) {
    if (user) {
      this.discordId = user.id;
      this.tag = user.tag;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  discordId!: string;

  @Column()
  tag!: string;

  @Column({ nullable: true })
  locale?: string;

  @OneToMany(type => MbtiTest, test => test.user, { cascade: true, onDelete: 'CASCADE' })
  tests: MbtiTest[];

  @Column()
  lastActive: Date = new Date();
}