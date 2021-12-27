import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MovieSchedulesService } from './movieschedules.service';
import { CreateMoviescheduleDto } from './dto/create-movieschedule.dto';
import { UpdateMoviescheduleDto } from './dto/update-movieschedule.dto';
import { Studio } from 'src/studios/entity/studio.entity';
import { StudiosService } from 'src/studios/studios.service';
import { MoviesService } from 'src/movies/movies.service';
import { Movie } from 'src/movies/entity/movie.entity';
import { Movieschedule } from './entity/movieschedule.entity';
import { makeResponse } from 'src/utils/http.utils';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AdminGuard } from 'src/auth/auth.guard';

@Controller({ path: 'backoffice/schedules/movies', version: '1' })
@UseGuards(AdminGuard)
export class MovieSchedulesController {
  constructor(
    private readonly movieschedulesService: MovieSchedulesService,
    private readonly studioService: StudiosService,
    private readonly movieService: MoviesService,
  ) {}

  @Post()
  async create(
    @Res() response,
    @Body() createMoviescheduleDto: CreateMoviescheduleDto,
  ) {
    const movieSchedule: Movieschedule = this.movieschedulesService.create(
      createMoviescheduleDto,
    );
    const studio: Studio = await this.studioService.findOne(
      createMoviescheduleDto.studio_id,
    );
    const movie: Movie[] = await this.movieService.findOne(
      createMoviescheduleDto.movie_id,
    );
    movieSchedule.studio = studio;
    movieSchedule.movie = movie[0];

    const createdMovieSchedule: Movieschedule =
      await this.movieschedulesService.save(movieSchedule);

    return makeResponse(
      response,
      true,
      200,
      { movies_schedules: createdMovieSchedule },
      'Operasi Berhasil',
    );
  }

  @Get()
  async findAll(@Res() res) {
    const movieSchedules: Movieschedule[] =
      await this.movieschedulesService.findAll();
    return makeResponse(res, true, 200, movieSchedules, 'Operasi Berhasil');
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    const movieSchedule = await this.movieschedulesService.findOne(+id);
    return makeResponse(res, true, 200, movieSchedule, 'Operasi Berhasil');
  }

  @Patch(':id')
  async update(
    @Res() res,
    @Param('id') id: string,
    @Body() updateMoviescheduleDto: UpdateMoviescheduleDto,
  ) {
    const result: UpdateResult = await this.movieschedulesService.update(
      +id,
      updateMoviescheduleDto,
    );
    if (result.affected < 1)
      return makeResponse(res, false, 404, null, 'Jadwal Tidak Ditemukan');

    const movieSchedule: Movieschedule =
      await this.movieschedulesService.findOne(+id);

    return makeResponse(res, true, 200, movieSchedule, 'Operasi Berhasil');
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string) {
    const result: DeleteResult = await this.movieschedulesService.remove(+id);

    if (result.affected < 1)
      return makeResponse(res, false, 404, null, 'Jadwal Tidak Ditemukan');

    return makeResponse(res, true, 200, null, 'Operasi Berhasil');
  }
}
