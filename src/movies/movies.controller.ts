import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { makeResponse } from 'src/utils/http.utils';
import { MovietagsService } from 'src/movietags/movietags.service';
import { TagsService } from 'src/tags/tags.service';

@Controller('backoffice/movies')
@UseInterceptors(FileInterceptor('poster'))
export class MoviesController {
  constructor(
    private readonly tagsService: TagsService,
    private readonly movieTagsService: MovietagsService,
    private readonly moviesService: MoviesService,
  ) {}

  @Post()
  async create(
    @Res() res,
    @UploadedFile() poster: Express.Multer.File,
    @Body() createMovieDto: CreateMovieDto,
  ) {
    console.log(poster);
    console.log(createMovieDto.tags);
    const movie = await this.moviesService.create(createMovieDto);
    // createMovieDto.tags.forEach(async (curr) => {
    //   const tag = await this.tagsService.findOne(+curr);
    //   // if (!tag) return makeResponse(res, true, 200, movie, 'Operasi Berhasil');
    //   // await this.tagsService.create
    // });
    return makeResponse(res, true, 200, movie, 'Operasi Berhasil');
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
