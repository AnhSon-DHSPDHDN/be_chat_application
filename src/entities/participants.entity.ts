import {
  BeforeInsert,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { uuid } from 'uuidv4';
import { BaseEntity } from './base-entity';
import { Room } from './room.entity';
import { User } from './user.entity';

@Entity('Participants')
export class Participants extends BaseEntity {
  @PrimaryColumn({ name: 'id' })
  _id: string;

  @ManyToOne(() => User)
  user: User;

  @OneToOne(() => Room, (room) => room._id)
  @JoinColumn()
  room: Room;

  @BeforeInsert()
  async beforeInsert() {
    this._id = uuid();
  }
}
