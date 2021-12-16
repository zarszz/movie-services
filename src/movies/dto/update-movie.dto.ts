import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsString } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @IsString()
  title: string;

  @IsString()
  overview: string;

  @IsString()
  poster: string;

  @IsString()
  play_until: string;

  @IsArray()
  tags: string[];
}
