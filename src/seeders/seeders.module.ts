import { Logger, Module } from '@nestjs/common';
import { MoviesModule } from 'src/movies/movies.module';
import { MovieSchedulesModule } from 'src/movieschedules/movieschedules.module';
import { OrdersModule } from 'src/orders/orders.module';
import { StudiosModule } from 'src/studios/studios.module';
import { TagsModule } from 'src/tags/tags.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmProviderModule } from './provider.module';
import { Seeder } from './seeder';

@Module({
  imports: [
    UsersModule,
    TagsModule,
    MoviesModule,
    StudiosModule,
    MovieSchedulesModule,
    OrdersModule,
    TypeOrmProviderModule,
  ],
  providers: [Logger, Seeder],
})
export class SeedersModule {}
