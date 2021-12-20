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
    const movieSchedules: Movieschedule[] = [];
    let total_item_price = 0;
    let total_qty = 0;

    const orderDetail = <OrderDetail>{
      total_qty: 0,
      total_price: 0,
      item_details: [],
    };

    for (let i = 0; i < createOrderDto.items.length; i++) {
      const movieSchedule: Movieschedule =
        await this.movieSchedulerService.findOne(
          createOrderDto.items[i].movie_schedule_id,
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
        qty: +createOrderDto.items[i].qty,
        sub_total_price: +movieSchedule.price * +createOrderDto.items[i].qty,
        start_time: movieSchedule.start_time,
        end_time: movieSchedule.end_time,
      });

      total_item_price += +movieSchedule.price * +createOrderDto.items[i].qty;
      total_qty += +createOrderDto.items[i].qty;
    }

    orderDetail.total_qty = total_qty;
    orderDetail.total_price = total_item_price;

    const order: Order = await this.orderRepository.save({
      user_id,
      payment_method: createOrderDto.payment_method,
      total_item_price,
    });

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (let i = 0; i < createOrderDto.items.length; i++) {
        await this.orderItemService.create(<OrderItem>{
          order_id: order.id,
          movie_schedule_id: movieSchedules[i].id,
          qty: createOrderDto.items[i].qty,
          price: movieSchedules[i].price,
          sub_total_price:
            movieSchedules[i].price * createOrderDto.items[i].qty,
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

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
