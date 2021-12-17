import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  overview: string;

  @IsNotEmpty()
  @IsString()
  play_until: string;

  @IsNotEmpty()
  @IsArray()
  tags: string[];

  poster: string;
}
