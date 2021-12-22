import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { makeResponse } from 'src/utils/http.utils';
import { MoviesService } from './movies.service';

@Controller('movies')
export class PublicMoviesController {
  constructor(private readonly movieService: MoviesService) {}
  @Get()
  async findAll(@Res() res) {
    const movies = await this.movieService.findAll();
    return makeResponse(res, true, 200, movies, 'Operasi Berhasil');
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    const movie = await this.movieService.findOne(+id);
    if (!movie) throw new NotFoundException();
    return makeResponse(res, true, 200, movie, 'Operasi Berhasil');
  }
}
