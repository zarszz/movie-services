import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { makeResponse } from 'src/utils/http.utils';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginDto } from './dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  async register(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
    @Body() userDto: CreateUserDto,
  ): Promise<Response> {
    try {
      if (!file) throw new Error('Not image provided');
      userDto.avatar = file.originalname;
      const createdUser: User = await this.userService.create(<User>userDto);
      return makeResponse(
        res,
        true,
        201,
        createdUser,
        'user created successfully',
      );
    } catch (error) {
      console.log(error.message);
      return makeResponse(res, false, 400, null, error);
    }
  }

  @Post('login')
  async login(@Res() response, @Body() loginDto: LoginDto): Promise<Response> {
    try {
      const user: User = await this.userService.findByEmail(loginDto.email);
      if (!user) throw new Error('Username or password incorrect');
      return makeResponse(response, true, 200, user, 'Success Login');
    } catch (error) {
      return makeResponse(response, false, 400, null, error.message);
    }
  }
}
