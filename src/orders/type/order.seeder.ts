import { CreateOrderDto } from '../dto/create-order.dto';
import { PaymentMethod } from './order.type';

export const orders: CreateOrderDto[] = [
  {
    payment_method: PaymentMethod.bank_transfer,
    items: [
      {
        movie_schedule_id: 1,
        qty: 5,
      },
      {
        movie_schedule_id: 2,
        qty: 3,
      },
    ],
  },
  {
    payment_method: PaymentMethod.bank_transfer,
    items: [
      {
        movie_schedule_id: 3,
        qty: 2,
      },
      {
        movie_schedule_id: 4,
        qty: 3,
      },
    ],
  },
  {
    payment_method: PaymentMethod.akulaku,
    items: [
      {
        movie_schedule_id: 1,
        qty: 3,
      },
      {
        movie_schedule_id: 3,
        qty: 3,
      },
    ],
  },
  {
    payment_method: PaymentMethod.gopay,
    items: [
      {
        movie_schedule_id: 2,
        qty: 2,
      },
      {
        movie_schedule_id: 4,
        qty: 1,
      },
    ],
  },
];
