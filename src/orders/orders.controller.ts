import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UseGuards,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { makeResponse } from 'src/utils/http.utils';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteResult } from 'typeorm';
import { User as GetUser } from 'src/utils/user.decorator';
import { User } from 'src/users/entity/user.entity';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Action } from 'src/casl/type/casl.type';

@Controller({ path: 'orders', version: '1' })
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Post('checkout')
  async create(
    @Req() req,
    @Res() response,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const result = await this.ordersService.create(
      createOrderDto,
      +req.user.id,
    );
    if (!result)
      return makeResponse(response, false, 500, null, 'Checkout Gagal');
    return makeResponse(response, true, 200, result, 'Checkout Success');
  }

  @Get()
  async findAll(@Res() res, @GetUser() user: User) {
    const results = user.is_admin
      ? await this.ordersService.findAll()
      : await this.ordersService.findAll(user.id);

    return makeResponse(res, true, 200, results, 'Operasi Berhasil');
  }

  @Get(':id')
  async findOne(@Res() res, @GetUser() user: User, @Param('id') id: string) {
    const order = await this.ordersService.findOne(+id);
    if (!order) throw new NotFoundException();

    const ability = this.caslAbilityFactory.createrForUser(user);
    if (!ability.can(Action.Update, order)) throw new UnauthorizedException();

    return makeResponse(res, true, 200, order, 'Operasi Berhasil');
  }

  @Patch(':id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @GetUser() user: User,
  ) {
    const order = await this.ordersService.findOne(+id);
    if (!order) throw new NotFoundException();

    const ability = this.caslAbilityFactory.createrForUser(user);
    if (!ability.can(Action.Update, order)) throw new UnauthorizedException();

    const results = await this.ordersService.update(+id, updateOrderDto);
    if (!results)
      return makeResponse(response, false, 400, null, 'Update Gagal');

    return makeResponse(response, true, 200, results, 'Update Berhasil');
  }

  @Delete(':id')
  async remove(@Res() res, @GetUser() user: User, @Param('id') id: string) {
    const order = await this.ordersService.findOne(+id);
    if (!order) throw new NotFoundException();

    const ability = this.caslAbilityFactory.createrForUser(user);
    if (!ability.can(Action.Update, order)) throw new UnauthorizedException();

    const deleteResult: DeleteResult = await this.ordersService.remove(+id);
    if (deleteResult.affected < 1)
      return makeResponse(res, false, 404, null, 'Order Tidak Ditemukan');

    return makeResponse(res, true, 200, null, 'Operasi Berhasil');
  }
}
