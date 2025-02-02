// orders:
//     id - uuid
// user_id - uuid
// cart_id - uuid (Foreign key from carts.id)
// payment - JSON
// delivery - JSON
// comments - text
// status - ENUM or text
// total - number

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carts } from '../../cart/entity/Carts';
import { User } from '../../users/entity/User';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @OneToOne(() => Carts)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart: Carts;

  @Column({ type: 'uuid', nullable: false })
  cart_id: string;

  @Column({ type: 'json', nullable: true })
  payment: string;

  @Column({ type: 'json', nullable: true })
  delivery: string;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column({ type: 'text', nullable: true })
  status: string;

  @Column({ type: 'integer', nullable: true })
  total: number;
}
