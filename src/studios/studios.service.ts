import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';
import { Studio } from './entity/studio.entity';

@Injectable()
export class StudiosService {
  constructor(
    @InjectRepository(Studio)
    private readonly studioRepository: Repository<Studio>,
  ) {}
  create(createStudioDto: CreateStudioDto) {
    return this.studioRepository.save(createStudioDto);
  }

  findAll() {
    return this.studioRepository.find();
  }

  findOne(id: number) {
    return this.studioRepository.findOne(id);
  }

  update(id: number, updateStudioDto: UpdateStudioDto) {
    return this.studioRepository.update({ id }, updateStudioDto);
  }

  remove(id: number) {
    return this.studioRepository.softDelete({ id });
  }
}
