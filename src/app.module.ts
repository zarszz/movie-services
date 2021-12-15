import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { getConnectionOptions } from 'typeorm';

import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule as ConfigAppModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigAppModule.register(),
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return <TypeOrmModuleOptions>Object.assign(
          await getConnectionOptions(),
          {
            autoLoadEntities: true,
          },
        );
      },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
