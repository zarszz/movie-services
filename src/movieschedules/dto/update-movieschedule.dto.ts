import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateMoviescheduleDto } from './create-movieschedule.dto';

export class UpdateMoviescheduleDto extends PartialType(
  CreateMoviescheduleDto,
) {
  @IsNumber()
  movie_id: number;

  @IsNumber()
  studio_id: number;

  @IsString()
  start_time: string;

  @IsString()
  end_time: string;

  @IsNumber()
  price: number;

  @IsString()
  date: string;
}
