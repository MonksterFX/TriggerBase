import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Trigger {
  @PrimaryGeneratedColumn()
  trigger: number;

  @Column()
  name: string;

  // @Column()
  // executeAt: Date;

  @Column()
  message: string;
}

export let a = null;
