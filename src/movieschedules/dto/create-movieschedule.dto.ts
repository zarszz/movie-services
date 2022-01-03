import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMoviescheduleDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  movie_id: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  studio_id: number;

  @IsString()
  @IsNotEmpty()
  start_time: string;

  @IsString()
  @IsNotEmpty()
  end_time: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  date: string;
}
