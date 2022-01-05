import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Res,
} from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { makeResponse } from 'src/utils/http.utils';
import { generateLinks } from 'src/utils/url.utils';
import { MovieScheduleSearchDto } from './dto/search-movie.dto';
import { MovieSchedulesService } from './movieschedules.service';

@Controller({ path: 'schedules/movies', version: '1' })
export class PublicMovieschedulesController {
  private configService = new ConfigService();
  constructor(private readonly movieScheduleService: MovieSchedulesService) {}
  @Get()
  async findAll(
    @Res() res,
    @Query() searchParam: MovieScheduleSearchDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    const route =
      this.configService.get('SERVE_URI') + '/api/v1/schedules/movies';
    let results = await this.movieScheduleService.paginate(
      {
        page,
        limit,
        route,
      },
      searchParam,
    );
    results = Object.assign(results, {
      links: generateLinks(results.links, searchParam),
    });
    return makeResponse(res, true, 200, results, 'Operasi Berhasil');
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    const movieSchedule = await this.movieScheduleService.findOne(+id);
    return makeResponse(res, true, 200, movieSchedule, 'Operasi Berhasil');
  }
}
