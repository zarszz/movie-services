import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login-dto';

import { JwtService } from '@nestjs/jwt';
import { SuccessLogin } from './type/login';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<SuccessLogin> {
    const user: User = await this.usersService.findByEmail(loginDto.email);
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      const _token = this.jwtService.sign({
        email: user.email,
        sub: user.id,
      });
      const { email, name, avatar } = user;
      return { email, name, avatar, _token };
    }
    return null;
  }
}
