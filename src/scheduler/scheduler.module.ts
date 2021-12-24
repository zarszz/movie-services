import { Module } from '@nestjs/common';
import { MoviesModule } from 'src/movies/movies.module';
import { CurrentPlayingFilmService } from './current-playing-film.service';

@Module({
  imports: [MoviesModule],
  providers: [CurrentPlayingFilmService],
  exports: [CurrentPlayingFilmService],
})
export class SchedulerModule {}
