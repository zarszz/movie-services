import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { verify } from 'jsonwebtoken';
import { ConfigService } from 'src/config/config.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];
    const signed = verify(token, new ConfigService().get('JWT_SECRET'));

    const user: User = await this.userService.findByEmail(signed['email']);

    return user.isAdmin;
  }
}
