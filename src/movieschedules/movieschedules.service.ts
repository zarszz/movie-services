import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMoviescheduleDto } from './dto/create-movieschedule.dto';
import { UpdateMoviescheduleDto } from './dto/update-movieschedule.dto';
import { Movieschedule } from './entity/movieschedule.entity';

import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { MovieScheduleSearchDto } from './dto/search-movie.dto';

@Injectable()
export class MovieSchedulesService {
  constructor(
    @InjectRepository(Movieschedule)
    private readonly movieScheduleRepository: Repository<Movieschedule>,
  ) {}
  create(createMoviescheduleDto: CreateMoviescheduleDto) {
    return this.movieScheduleRepository.create(createMoviescheduleDto);
  }

  save(movieSchedule: Movieschedule) {
    return this.movieScheduleRepository.save(movieSchedule);
  }

  findAll() {
    return this.movieScheduleRepository
      .createQueryBuilder('movie_schedules')
      .leftJoinAndSelect('movie_schedules.movie', 'movie')
      .leftJoinAndSelect('movie_schedules.studio', 'studio')
      .getMany();
  }

  async paginate(
    options: IPaginationOptions,
    searchParam: MovieScheduleSearchDto,
  ): Promise<Pagination<Movieschedule>> {
    let queryBuilder = this.movieScheduleRepository
      .createQueryBuilder('movie_schedules')
      .leftJoinAndSelect('movie_schedules.movie', 'movie')
      .leftJoinAndSelect('movie_schedules.studio', 'studio')
      .leftJoinAndSelect('movie.movie_tags', 'movie_tags');

    if (searchParam.start_time)
      queryBuilder = queryBuilder.where(
        'movie_schedules.start_time LIKE :start_time',
        {
          start_time: `%${searchParam.start_time}%`,
        },
      );
    if (searchParam.end_time)
      queryBuilder = queryBuilder.orWhere(
        'movie_schedules.end_time LIKE :end_time',
        {
          end_time: `%${searchParam.end_time}%`,
        },
      );
    if (searchParam.date)
      queryBuilder = queryBuilder.orWhere('movie_schedules.date = :date', {
        date: `${searchParam.date}`,
      });
    if (searchParam.min_price && searchParam.max_price)
      queryBuilder = queryBuilder.orWhere(
        'movie_schedules.price >= :min_price AND movie_schedules.price <= :max_price',
        {
          min_price: `${+searchParam.min_price}`,
          max_price: `${+searchParam.max_price}`,
        },
      );
    return paginate(queryBuilder, options);
  }

  findOne(id: number) {
    return this.movieScheduleRepository
      .createQueryBuilder('movie_schedules')
      .leftJoinAndSelect('movie_schedules.movie', 'movie')
      .leftJoinAndSelect('movie_schedules.studio', 'studio')
      .where('movie_schedules.id = :id', { id })
      .getOne();
  }

  update(id: number, updateMoviescheduleDto: UpdateMoviescheduleDto) {
    return this.movieScheduleRepository.update(id, updateMoviescheduleDto);
  }

  remove(id: number) {
    return this.movieScheduleRepository.softDelete(id);
  }
}
