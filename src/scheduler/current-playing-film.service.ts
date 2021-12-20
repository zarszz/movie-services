import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { ConfigService } from 'src/config/config.service';
import { Movie } from 'src/movies/entity/movie.entity';
import { MoviesService } from 'src/movies/movies.service';
import { Film, IMovie } from './entity/film.entity';

@Injectable()
export class CurrentPlayingFilmService {
  private configService = new ConfigService();

  constructor(private readonly movieService: MoviesService) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const key = this.configService.get('THEMOVIEDB_KEY');
    const host = this.configService.get('API_URL');
    const response = await axios.get(
      `${host}/3/movie/now_playing?api_key=${key}&language=en-US&page=1`,
    );
    const films: Film[] = response.data.results;
    const movies: IMovie[] = [];
    films.forEach((film) => {
      movies.push(<IMovie>{
        title: film.title,
        overview: film.overview.substr(0, 200),
        play_until: film.release_date,
        poster: film.backdrop_path,
      });
    });
    const moviesObj = <Movie[]>(<unknown>movies);
    this.movieService.bulkInsert(moviesObj);
  }
}
