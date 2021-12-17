import { Module } from '@nestjs/common';
import { MoviesModule } from 'src/movies/movies.module';
import { CurrentPlayingFilmService } from './current_playing_film.service';
import { HealthService } from './health.service';

@Module({
  imports: [MoviesModule],
  providers: [CurrentPlayingFilmService, HealthService],
  exports: [CurrentPlayingFilmService, HealthService],
})
export class SchedulerModule {}
