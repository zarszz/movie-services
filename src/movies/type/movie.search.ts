import { IsOptional, IsString, MinLength } from 'class-validator';

export class MovieSearchDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  public term: string;

  @IsOptional()
  @IsString()
  public tags: string;
}
