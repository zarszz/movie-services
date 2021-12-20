import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { SuccessLogin } from './type/login';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(loginDto: LoginDto): Promise<SuccessLogin> {
    const user: SuccessLogin = await this.authService.login(loginDto);
    if (!user) {
      return null;
    }
    return user;
  }
}
