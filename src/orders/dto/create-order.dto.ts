import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { PaymentMethod } from '../entities/order.entity';

export type OrderItem = {
  movie_schedule_id: number;
  qty: number;
};

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  items: OrderItem[];

  @IsString()
  @IsNotEmpty()
  payment_method: PaymentMethod;
}
