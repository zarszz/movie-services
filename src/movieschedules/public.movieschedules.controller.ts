import { Controller, Get, Param, Res } from '@nestjs/common';
import { makeResponse } from 'src/utils/http.utils';
import { Movieschedule } from './entity/movieschedule.entity';
import { MovieSchedulesService } from './movieschedules.service';

@Controller('schedules/movies')
export class PublicMovieschedulesController {
  constructor(private readonly movieScheduleService: MovieSchedulesService) {}
  @Get()
  async findAll(@Res() res) {
    const movieSchedules: Movieschedule[] =
      await this.movieScheduleService.findAll();
    return makeResponse(res, true, 200, movieSchedules, 'Operasi Berhasil');
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    const movieSchedule = await this.movieScheduleService.findOne(+id);
    return makeResponse(res, true, 200, movieSchedule, 'Operasi Berhasil');
  }
}
