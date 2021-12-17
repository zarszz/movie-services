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
import { diskStorage } from 'multer';
import { ConfigService } from 'src/config/config.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { filterImage, getFileName } from 'src/utils/file.upload.utils';
import { makeResponse } from 'src/utils/http.utils';
import { logger } from 'src/utils/logger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginDto } from './dto/login-dto';
import { SuccessLogin } from './entity/login';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './upload/avatar',
        filename: getFileName,
      }),
      fileFilter: filterImage,
    }),
  )
  async register(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
    @Body() userDto: CreateUserDto,
  ): Promise<Response> {
    try {
      if (!file) throw new Error('Not image provided');
      userDto.avatar =
        new ConfigService().get('SERVE_STATIC') + '/avatar/' + file.filename;
      const createdUser: User = await this.userService.create(<User>userDto);
      return makeResponse(
        res,
        true,
        201,
        createdUser,
        'user created successfully',
      );
    } catch (error) {
      logger.error(error.message);
      return makeResponse(res, false, 400, null, error);
    }
  }

  @Post('login')
  async login(@Res() response, @Body() loginDto: LoginDto): Promise<Response> {
    try {
      const user: SuccessLogin = await this.authService.login(loginDto);
      if (!user) throw new Error('Username or password incorrect');
      return makeResponse(response, true, 200, user, 'Success Login');
    } catch (error) {
      return makeResponse(response, false, 400, null, error.message);
    }
  }
}
