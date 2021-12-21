import { Module } from '@nestjs/common';
import { MovieSchedulesService } from './movieschedules.service';
import { MovieSchedulesController } from './movieschedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movieschedule } from './entity/movieschedule.entity';
import { MoviesModule } from 'src/movies/movies.module';
import { StudiosModule } from 'src/studios/studios.module';
import { MovieScheduleSeederService } from './movieschedules.seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movieschedule]),
    MoviesModule,
    StudiosModule,
  ],
  controllers: [MovieSchedulesController],
  providers: [MovieSchedulesService, MovieScheduleSeederService],
  exports: [MovieSchedulesService, MovieScheduleSeederService],
})
export class MovieSchedulesModule {}
