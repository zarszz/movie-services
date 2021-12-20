import { OrderItem } from 'src/orderitems/entity/orderitem.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PaymentMethod {
  'credit_card',
  'bank_transfer',
  'bca_klikpay',
  'bri_epay',
  'cimb_clicks',
  'danamon_online',
  'qris',
  'gopay',
  'shopeepay',
  'cstore',
  'akulaku',
}

export type OrderDetailItem = {
  movie: {
    id: number;
    title: string;
  };
  studio_number: number;
  qty: number;
  sub_total_price: number;
  start_time: string;
  end_time: string;
};

export type OrderDetail = {
  total_qty: number;
  total_price: number;
  item_details: OrderDetailItem[];
};

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  payment_method: PaymentMethod;

  @Column()
  total_item_price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  order_items: OrderItem[];
}
