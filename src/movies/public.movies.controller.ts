import {
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
  Res,
} from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { makeResponse } from 'src/utils/http.utils';
import { generateLinks } from 'src/utils/url.utils';
import { MoviesService } from './movies.service';
import { MovieSearchDto } from './type/movie.search';

@Controller({ path: 'movies', version: '1' })
export class PublicMoviesController {
  private configService = new ConfigService();
  constructor(private readonly movieService: MoviesService) {}
  @Get()
  async findAll(
    @Res() res,
    @Query() searchParam: MovieSearchDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    limit = limit > 100 ? 100 : limit;
    const route = this.configService.get('SERVE_URI') + '/api/v1/movies';
    let results = await this.movieService.paginate(
      { page, limit, route },
      searchParam,
    );
    results = Object.assign(results, {
      links: generateLinks(results.links, searchParam),
    });
    return makeResponse(res, true, 200, results, 'Operasi Berhasil');
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    const movie = await this.movieService.findOne(+id);
    if (!movie) throw new NotFoundException();
    return makeResponse(res, true, 200, movie, 'Operasi Berhasil');
  }
}
