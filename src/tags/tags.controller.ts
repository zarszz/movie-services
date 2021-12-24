import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entity/tag.entity';
import { makeResponse } from 'src/utils/http.utils';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AdminGuard } from 'src/auth/auth.guard';

@Controller({ path: 'backoffice/tags', version: '1' })
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @UseGuards(AdminGuard)
  async create(@Res() response, @Body() createTagDto: CreateTagDto) {
    const tag: Tag = await this.tagsService.create(<Tag>createTagDto);
    return makeResponse(response, true, 200, tag, 'Operasi Berhasil');
  }

  @Get()
  async findAll(@Res() response) {
    const tags: Tag[] = await this.tagsService.findAll();
    return makeResponse(response, true, 200, tags, 'Operasi Berhasil');
  }

  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string) {
    const tag: Tag = await this.tagsService.findOne(+id);

    if (!tag)
      return makeResponse(response, true, 404, null, 'Tag Tidak Ditemukan');

    return makeResponse(response, true, 200, tag, 'Operasi Berhasil');
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    const result: UpdateResult = await this.tagsService.update(
      +id,
      updateTagDto,
    );

    if (result.affected < 1)
      return makeResponse(response, false, 404, null, 'Tag Tidak Ditemukan');

    const tag: Tag = await this.tagsService.findOne(+id);
    return makeResponse(response, true, 200, tag, 'Operasi Berhasil');
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Res() response, @Param('id') id: string) {
    const result: DeleteResult = await this.tagsService.remove(+id);

    if (result.affected < 1)
      throw new BadRequestException('Tag Tidak Ditemukan');

    return makeResponse(response, true, 200, null, 'Operasi Berhasil');
  }
}
