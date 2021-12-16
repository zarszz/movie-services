import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { getConnectionOptions } from 'typeorm';
import { ConfigModule as ConfigAppModule } from './config/config.module';
import { TagsModule } from './tags/tags.module';
import { MovietagsModule } from './movietags/movietags.module';
import { MoviesModule } from './movies/movies.module';

import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

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
            synchronize: true,
          },
        );
      },
    }),
    UsersModule,
    AuthModule,
    TagsModule,
    MovietagsModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
