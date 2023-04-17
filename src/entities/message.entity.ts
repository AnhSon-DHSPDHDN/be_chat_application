import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { uuid } from 'uuidv4';
import { BaseEntity } from './base-entity';
import { Room } from './room.entity';

@Entity('Message')
export class Message extends BaseEntity {
  @PrimaryColumn({ name: 'id' })
  _id: string;

  @OneToOne(() => Room)
  @JoinColumn({ name: 'room_id' })
  roomId: string;

  @OneToOne(() => Room)
  @JoinColumn({ name: 'from_user_id' })
  fromUserId: string;

  @Column({ type: 'text' })
  message: string;

  @BeforeInsert()
  async beforeInsert() {
    this._id = uuid();
  }
}
