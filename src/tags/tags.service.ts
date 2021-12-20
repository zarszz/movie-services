import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entity/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}
  create(tag: Tag): Promise<Tag> {
    return this.tagsRepository.save(tag);
  }

  findAll() {
    return this.tagsRepository.find();
  }

  findOne(id: number) {
    return this.tagsRepository.findOne(id);
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return this.tagsRepository.update({ id }, updateTagDto);
  }

  remove(id: number) {
    return this.tagsRepository.delete({ id });
  }
}
