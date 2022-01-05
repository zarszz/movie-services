import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';

import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { MovieSearchDto } from './type/movie.search';

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
      .leftJoinAndSelect('movie.movie_tags', 'tag')
      .getMany();
  }

  findOne(id: number) {
    return this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.movie_tags', 'tag')
      .where('movie.id = :id', { id })
      .getMany();
  }

  async paginate(
    options: IPaginationOptions,
    searchParam: MovieSearchDto,
  ): Promise<Pagination<Movie>> {
    let queryBuilder = this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.movie_tags', 'tag');
    if (searchParam.term) {
      queryBuilder = queryBuilder
        .where('title LIKE :term', { term: `%${searchParam.term}%` })
        .orWhere('overview LIKE :term', { term: `%${searchParam.term}%` });
    }
    if (searchParam.tags) {
      searchParam.tags.split(',').map((param) => {
        queryBuilder = queryBuilder.orWhere('tag.name LIKE :tag ', {
          tag: `%${param}%`,
        });
      });
    }
    return paginate(queryBuilder, options);
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
