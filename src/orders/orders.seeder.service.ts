import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { orders } from './type/order.seeder';
import { OrderDetail } from './type/order.type';

@Injectable()
export class OrderSeederService {
  constructor(private readonly orderService: OrdersService) {}

  create(): Promise<OrderDetail>[] {
    return orders.map(async (order: CreateOrderDto) => {
      return this.orderService.create(order, 1);
    });
  }
}
