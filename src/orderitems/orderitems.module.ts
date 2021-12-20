import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entity/orderitem.entity';
import { OrderItemsService } from './orderitems.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  providers: [OrderItemsService],
  exports: [OrderItemsService],
})
export class OrderitemsModule {}
