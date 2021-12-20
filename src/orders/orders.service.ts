import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movieschedule } from 'src/movieschedules/entities/movieschedule.entity';
import { MovieSchedulesService } from 'src/movieschedules/movieschedules.service';
import { OrderItem } from 'src/orderitems/entity/orderitem.entity';
import { OrderItemsService } from 'src/orderitems/orderitems.service';
import { logger } from 'src/utils/logger';
import { Connection, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDetail, OrderDetailItem } from './entities/order.entity';

enum ACTION {
  'CREATE',
  'UPDATE',
}

@Injectable()
export class OrdersService {
  constructor(
    private readonly movieSchedulerService: MovieSchedulesService,
    private readonly orderItemService: OrderItemsService,
    private readonly connection: Connection,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto, user_id: number) {
    const results = await this.generateOrders(
      createOrderDto,
      user_id,
      ACTION.CREATE,
    );
    return results;
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return this.orderRepository.find({ id });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne(id);
    if (!order) return undefined;

    await this.orderRepository
      .createQueryBuilder()
      .delete()
      .from(OrderItem)
      .where('order_id = :order_id', { order_id: id })
      .execute();

    const results = await this.generateOrders(
      updateOrderDto,
      order.user_id,
      ACTION.UPDATE,
      order.id,
    );
    return results;
  }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }

  private async generateOrders(
    order_dto: CreateOrderDto | UpdateOrderDto,
    user_id: number,
    action: ACTION,
    order_id?: number,
  ): Promise<OrderDetail> | undefined {
    const movieSchedules: Movieschedule[] = [];
    let total_item_price = 0;
    let total_qty = 0;
    let order: Order;

    if (action === ACTION.UPDATE) {
      order = await this.orderRepository.findOne(order_id);
      if (!order) throw new BadRequestException('Order not found');
    } else if (action === ACTION.CREATE) {
      order = await this.orderRepository.save({
        user_id,
        payment_method: order_dto.payment_method,
        total_item_price,
      });
    }

    const orderDetail = <OrderDetail>{
      total_qty: 0,
      total_price: 0,
      item_details: [],
    };

    for (let i = 0; i < order_dto.items.length; i++) {
      const movieSchedule: Movieschedule =
        await this.movieSchedulerService.findOne(
          order_dto.items[i].movie_schedule_id,
        );

      if (!movieSchedule)
        throw new BadRequestException('Movie Schedule Not Found');

      movieSchedules.push(movieSchedule);

      orderDetail.item_details.push(<OrderDetailItem>{
        movie: {
          id: movieSchedule.movie.id,
          title: movieSchedule.movie.title,
        },
        studio_number: movieSchedule.studio.id,
        qty: +order_dto.items[i].qty,
        sub_total_price: +movieSchedule.price * +order_dto.items[i].qty,
        start_time: movieSchedule.start_time,
        end_time: movieSchedule.end_time,
      });

      total_item_price += +movieSchedule.price * +order_dto.items[i].qty;
      total_qty += +order_dto.items[i].qty;
    }

    orderDetail.total_qty = total_qty;
    orderDetail.total_price = total_item_price;

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (let i = 0; i < order_dto.items.length; i++) {
        await this.orderItemService.create(<OrderItem>{
          order_id: order.id,
          movie_schedule_id: movieSchedules[i].id,
          qty: order_dto.items[i].qty,
          price: movieSchedules[i].price,
          sub_total_price: movieSchedules[i].price * order_dto.items[i].qty,
        });
      }
      await queryRunner.commitTransaction();
      return orderDetail;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      logger.error(error.message);
      return undefined;
    } finally {
      await queryRunner.release();
    }
  }
}
