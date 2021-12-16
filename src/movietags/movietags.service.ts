import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieTag } from './entity/movietags.entity';

@Injectable()
export class MovietagsService {
  constructor(
    @InjectRepository(MovieTag)
    private readonly movieTagsRepository: Repository<MovieTag>,
  ) {}
  create(tag: MovieTag): Promise<MovieTag> {
    return this.movieTagsRepository.save(tag);
  }

  findAll() {
    return this.movieTagsRepository.find();
  }

  findOne(id: number) {
    return this.movieTagsRepository.findOne(id);
  }

  update(id: number, movieTag: MovieTag) {
    return this.movieTagsRepository.update({ id }, movieTag);
  }

  remove(id: number) {
    return this.movieTagsRepository.delete({ id });
  }
}
