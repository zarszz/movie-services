import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMovie } from 'src/scheduler/type/film.type';
import { TagsService } from 'src/tags/tags.service';
import { Repository } from 'typeorm';
import { Movie } from './entity/movie.entity';
import { movies } from './type/movie.seeder';

@Injectable()
export class MovieSeederService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly tagService: TagsService,
  ) {}

  create(): Promise<Movie>[] {
    return movies.map(async (movie: IMovie) => {
      const movieObj = this.movieRepository.create(movie);
      const tags = await Promise.all(
        movie.tags.map(async (tag) => await this.tagService.findOne(+tag)),
      );
      movieObj.movieTags = tags;
      const createdMovies = await this.movieRepository.save(movieObj);
      return createdMovies;
    });
  }
}
