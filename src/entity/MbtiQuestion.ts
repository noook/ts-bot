import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Dichotomy } from '@/types/mbti';

@Entity()
export class MbtiQuestion {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  step: number;

  @Column()
  key: 'left' | 'right';

  @Column({ nullable: true })
  value?: Dichotomy;
}
