import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { AdminGuard } from './auth.guard';
@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, AdminGuard],
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: new ConfigService().get('JWT_SECRET'),
      signOptions: { expiresIn: `${(60 * 60 * 24 * 30).toString()}s` },
    }),
    UsersModule,
  ],
  exports: [AdminGuard],
})
export class AuthModule {}
