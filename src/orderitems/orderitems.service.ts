import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './entity/orderitem.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}
  create(orderItem: OrderItem) {
    return this.orderItemRepository.save(orderItem);
  }

  findByOrder(order_id: number) {
    return this.orderItemRepository.find({ order_id });
  }

  findById(id: number) {
    return this.orderItemRepository.findOne(id);
  }

  update(id: number, orderItem: OrderItem) {
    return this.orderItemRepository.update({ id }, orderItem);
  }

  delete(id: number) {
    return this.orderItemRepository.softDelete({ id });
  }
}
