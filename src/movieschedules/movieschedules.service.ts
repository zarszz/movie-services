import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMoviescheduleDto } from './dto/create-movieschedule.dto';
import { UpdateMoviescheduleDto } from './dto/update-movieschedule.dto';
import { Movieschedule } from './entities/movieschedule.entity';

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
