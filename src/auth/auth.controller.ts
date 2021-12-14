import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './create-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  async register(
    @UploadedFile() file: Express.Multer.File,
    @Body() userDto: CreateUserDto,
  ): Promise<User> {
    try {
      if (!file) throw new BadRequestException('Not image provided');
      userDto.avatar = file.originalname;
      const createdUser: User = await this.userService.create(<User>userDto);
      return createdUser;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  @Post('login')
  login() {
    return true;
  }
}
