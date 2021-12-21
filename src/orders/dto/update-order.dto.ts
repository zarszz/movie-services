import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Item, PaymentMethod } from '../type/order.type';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsArray()
  @IsNotEmpty()
  items: Item[];

  @IsString()
  @IsNotEmpty()
  payment_method: PaymentMethod;
}
