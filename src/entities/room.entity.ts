import { TRoomType } from 'src/enums/room.enum';
import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { uuid } from 'uuidv4';
import { BaseEntity } from './base-entity';

@Entity('Room')
export class Room extends BaseEntity {
  @PrimaryColumn({ name: 'id' })
  _id: string;

  @Column()
  name: string;

  @Column()
  type: TRoomType;

  @BeforeInsert()
  async beforeInsert() {
    this._id = uuid();
  }
}
