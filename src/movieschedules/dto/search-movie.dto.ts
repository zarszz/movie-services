import { IsOptional, IsString } from 'class-validator';

export class MovieScheduleSearchDto {
  @IsOptional()
  @IsString()
  date: string;

  @IsOptional()
  @IsString()
  start_time: string;

  @IsOptional()
  @IsString()
  end_time: string;

  @IsOptional()
  min_price: number;

  @IsOptional()
  max_price: number;
}
