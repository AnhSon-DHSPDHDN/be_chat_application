import { ERoles } from 'src/enums/user.enum';
import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';
import { BaseEntity } from './base-entity';

@Entity('User')
export class User extends BaseEntity {
  @PrimaryColumn({ name: 'id' })
  _id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  role: ERoles;

  @BeforeInsert()
  async beforeInsert() {
    this._id = v4();
    this.role = ERoles.USERS;
  }
}
