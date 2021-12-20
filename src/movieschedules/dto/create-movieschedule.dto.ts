import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMoviescheduleDto {
  @IsNumber()
  @IsNotEmpty()
  movie_id: number;

  @IsNumber()
  @IsNotEmpty()
  studio_id: number;

  @IsString()
  @IsNotEmpty()
  start_time: string;

  @IsString()
  @IsNotEmpty()
  end_time: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  date: string;
}
