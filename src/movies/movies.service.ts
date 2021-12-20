import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}
  create(createMovieDto: CreateMovieDto) {
    const { tags, ...data } = createMovieDto;
    return this.movieRepository.create(data);
  }
  save(movie: Movie) {
    return this.movieRepository.save(movie);
  }

  findAll() {
    return this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.movieTags', 'tag')
      .getMany();
  }

  findOne(id: number) {
    return this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.movieTags', 'tag')
      .where('movie.id = :id', { id })
      .getMany();
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return this.movieRepository.update({ id }, updateMovieDto);
  }

  remove(id: number) {
    return this.movieRepository.delete(id);
  }

  bulkInsert(movies: Movie[]) {
    return this.movieRepository.insert(movies);
  }
}
