import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Item, PaymentMethod } from '../type/order.type';

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  items: Item[];

  @IsString()
  @IsNotEmpty()
  payment_method: PaymentMethod;
}
