import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Item, PaymentMethod } from '../entities/order.entity';

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  items: Item[];

  @IsString()
  @IsNotEmpty()
  payment_method: PaymentMethod;
}
