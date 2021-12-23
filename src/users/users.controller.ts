import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/auth.guard';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @Get()
  @UseGuards(AdminGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  update(@Param('id') id: string, @Body() user: User) {
    return this.usersService.update(+id, user);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
