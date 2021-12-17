import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { ConfigService } from 'src/config/config.service';
import { Film } from './entities/film.entity';

@Injectable()
export class CurrentPlayingFilmService {
  @Cron(CronExpression.EVERY_10_HOURS)
  async handleCron() {
    const key = new ConfigService().get('THEMOVIEDB_KEY');
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`,
    );
    const films: Film[] = response.data.results;
    console.log(films);
    // TODO : insert film data to db
  }
}
