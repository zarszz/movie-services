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
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { makeResponse } from 'src/utils/http.utils';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteResult } from 'typeorm';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  async create(
    @Req() req,
    @Res() response,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const result = await this.ordersService.create(
      createOrderDto,
      +req.user.userId,
    );
    if (!result)
      return makeResponse(response, false, 500, null, 'Checkout Gagal');
    return makeResponse(response, true, 200, result, 'Checkout Success');
  }

  @Get()
  async findAll(@Res() res) {
    const results = await this.ordersService.findAll();
    return makeResponse(res, true, 200, results, 'Operasi Berhasil');
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    const result = await this.ordersService.findOne(+id);
    if (!result)
      return makeResponse(res, false, 404, null, 'Order Tidak Ditemukan');
    return makeResponse(res, true, 200, result, 'Operasi Berhasil');
  }

  @Patch(':id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const results = await this.ordersService.update(+id, updateOrderDto);
    if (!results)
      return makeResponse(response, false, 400, null, 'Update Gagal');
    return makeResponse(response, true, 200, results, 'Update Berhasil');
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string) {
    const deleteResult: DeleteResult = await this.ordersService.remove(+id);
    if (deleteResult.affected < 1)
      return makeResponse(res, false, 404, null, 'Order Tidak Ditemukan');
    return makeResponse(res, true, 200, null, 'Operasi Berhasil');
  }
}
