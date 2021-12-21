import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entity/tag.entity';
import { ITag, tags } from './type/tag.seeder';

@Injectable()
export class TagSeederService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  create(): Promise<Tag>[] {
    return tags.map(async (tag: ITag) => {
      return await this.tagRepository.save(<Tag>tag);
    });
  }
}
