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
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { makeResponse } from 'src/utils/http.utils';
import { TagsService } from 'src/tags/tags.service';
import { diskStorage } from 'multer';
import { filterImage, getFileName } from 'src/utils/file.upload.utils';
import { ConfigService } from 'src/config/config.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { response } from 'express';
import { AdminGuard } from 'src/auth/auth.guard';

@Controller('backoffice/movies')
export class MoviesController {
  constructor(
    private readonly tagsService: TagsService,
    private readonly moviesService: MoviesService,
  ) {}

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FileInterceptor('poster', {
      storage: diskStorage({
        destination: './upload/poster',
        filename: getFileName,
      }),
      fileFilter: filterImage,
    }),
  )
  async create(
    @Res() res,
    @UploadedFile() poster: Express.Multer.File,
    @Body() createMovieDto: CreateMovieDto,
  ) {
    createMovieDto.poster =
      new ConfigService().get('SERVE_STATIC') + '/poster/' + poster.filename;
    const movieObj = this.moviesService.create(createMovieDto);
    const tags = await Promise.all(
      createMovieDto.tags.map(
        async (id) => await this.tagsService.findOne(+id),
      ),
    );
    movieObj.movieTags = tags;
    const movie = await this.moviesService.save(movieObj);
    return makeResponse(res, true, 200, movie, 'Operasi Berhasil');
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string) {
    const movie = await this.moviesService.findOne(+id);
    if (!movie)
      return makeResponse(response, false, 404, null, 'Operasi Gagal');
    return makeResponse(response, true, 200, movie, 'Operasi Berhasil');
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    const result: UpdateResult = await this.moviesService.update(
      +id,
      updateMovieDto,
    );
    if (result.affected < 1)
      return makeResponse(response, false, 404, null, 'Operasi Gagal');
    return makeResponse(response, false, 200, null, 'Operasi Berhasil');
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string) {
    const result: DeleteResult = await this.moviesService.remove(+id);
    if (result.affected < 1)
      return makeResponse(response, false, 404, null, 'Operasi Gagal');
    return makeResponse(response, false, 200, null, 'Operasi Berhasil');
  }
}
