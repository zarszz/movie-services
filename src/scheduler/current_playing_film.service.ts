import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { ConfigService } from 'src/config/config.service';
import { Movie } from 'src/movies/entities/movie.entity';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class CurrentPlayingFilmService {
  constructor(private readonly movieService: MoviesService) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const key = new ConfigService().get('THEMOVIEDB_KEY');
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`,
    );
    const movies: Movie[] = response.data.results;
    this.movieService.bulkInsert(movies);
  }
}
