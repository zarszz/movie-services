import { Module } from '@nestjs/common';
import { CurrentPlayingFilmService } from './current_playing_film.service';
import { HealthService } from './health.service';

@Module({
  providers: [CurrentPlayingFilmService, HealthService],
  exports: [CurrentPlayingFilmService, HealthService],
})
export class SchedulerModule {}
