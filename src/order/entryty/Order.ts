// orders:
//     id - uuid
// user_id - uuid
// cart_id - uuid (Foreign key from carts.id)
// payment - JSON
// delivery - JSON
// comments - text
// status - ENUM or text
// total - number

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Carts } from '../../cart/entity/Carts';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @OneToMany(() => Carts, (cart) => cart.id)
  cart_id: string;

  @Column({ type: 'json', nullable: false })
  payment: string;

  @Column({ type: 'json', nullable: false })
  delivery: string;

  @Column({ type: 'text', nullable: false })
  comments: string;

  @Column({ type: 'text', nullable: false })
  status: string;

  @Column({ type: 'integer', nullable: false })
  total: number;
}
