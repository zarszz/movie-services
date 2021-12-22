import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviesService } from 'src/movies/movies.service';
import { StudiosService } from 'src/studios/studios.service';
import { Repository } from 'typeorm';
import { Movieschedule } from './entity/movieschedule.entity';
import { IMovieSchedule, movieSchedules } from './type/movieschedule.seeder';

@Injectable()
export class MovieScheduleSeederService {
  constructor(
    @InjectRepository(Movieschedule)
    private readonly movieScheduleRepository: Repository<Movieschedule>,
    private readonly movieService: MoviesService,
    private readonly studioService: StudiosService,
  ) {}

  create(): Promise<Movieschedule>[] {
    return movieSchedules.map(async (schedule: IMovieSchedule) => {
      const scheduleObj = this.movieScheduleRepository.create(schedule);

      const movie = await this.movieService.findOne(schedule.movie_id);
      scheduleObj.movie = movie[0];

      const studio = await this.studioService.findOne(schedule.studio_id);
      scheduleObj.studio = studio;

      return await this.movieScheduleRepository.save(scheduleObj);
    });
  }
}
