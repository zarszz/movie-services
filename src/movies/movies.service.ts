import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}
  create(createMovieDto: CreateMovieDto) {
    const { tags, ...data } = createMovieDto;
    return this.movieRepository.save(data);
  }

  findAll() {
    return this.movieRepository.find();
  }

  findOne(id: number) {
    return this.movieRepository.findOne(id);
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return this.movieRepository.update({ id }, updateMovieDto);
  }

  remove(id: number) {
    return this.movieRepository.delete(id);
  }
}
