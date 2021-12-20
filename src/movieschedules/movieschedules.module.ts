import { Module } from '@nestjs/common';
import { MovieSchedulesService } from './movieschedules.service';
import { MovieSchedulesController } from './movieschedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movieschedule } from './entities/movieschedule.entity';
import { MoviesModule } from 'src/movies/movies.module';
import { StudiosModule } from 'src/studios/studios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movieschedule]),
    MoviesModule,
    StudiosModule,
  ],
  controllers: [MovieSchedulesController],
  providers: [MovieSchedulesService],
})
export class MovieSchedulesModule {}
