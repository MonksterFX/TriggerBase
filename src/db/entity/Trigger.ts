import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Trigger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  executeAt: Date;

  @Column()
  message: string;

  fromJSON() {
    console.log('fromJson');
  }

  toJSON() {
    let ret = this;
    ret.message = JSON.parse(this.message);
    return ret;
  }
}

export let a = null;
