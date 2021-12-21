import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Studio } from './entity/studio.entity';
import { IStudio, studios } from './type/studio.type';

@Injectable()
export class StudioSeederService {
  constructor(
    @InjectRepository(Studio)
    private readonly studioRepository: Repository<Studio>,
  ) {}

  create(): Promise<Studio>[] {
    return studios.map(async (studio: IStudio) => {
      return await this.studioRepository.save(studio);
    });
  }
}
