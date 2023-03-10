import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { getConnectionOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule as ConfigAppModule } from './config/config.module';
import { LoggerMiddleware } from './middleware/logger';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TagsModule } from './tags/tags.module';
import { MoviesModule } from './movies/movies.module';
import { SeedersModule } from './seeders/seeders.module';
import { StudiosModule } from './studios/studios.module';
import { MovieSchedulesModule } from './movieschedules/movieschedules.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { OrdersModule } from './orders/orders.module';
import { OrderitemsModule } from './orderitems/orderitems.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigAppModule.register(),
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return <TypeOrmModuleOptions>Object.assign(
          await getConnectionOptions(),
          {
            namingStrategy: new SnakeNamingStrategy(),
            autoLoadEntities: true,
          },
        );
      },
    }),
    MulterModule.register(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
      serveRoot: '/public',
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    TagsModule,
    MoviesModule,
    SchedulerModule,
    SeedersModule,
    StudiosModule,
    MovieSchedulesModule,
    OrdersModule,
    OrderitemsModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
