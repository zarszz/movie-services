import { Module } from '@nestjs/common';
import { MovieSchedulesService } from './movieschedules.service';
import { MovieSchedulesController } from './movieschedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movieschedule } from './entity/movieschedule.entity';
import { MoviesModule } from 'src/movies/movies.module';
import { StudiosModule } from 'src/studios/studios.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movieschedule]),
    MoviesModule,
    StudiosModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [MovieSchedulesController],
  providers: [MovieSchedulesService],
  exports: [MovieSchedulesService],
})
export class MovieSchedulesModule {}
