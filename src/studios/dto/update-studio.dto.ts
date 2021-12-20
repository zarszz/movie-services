import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateStudioDto } from './create-studio.dto';

export class UpdateStudioDto extends PartialType(CreateStudioDto) {
  @IsNumber()
  studio_number: number;

  @IsNumber()
  seat_capacity: number;
}
