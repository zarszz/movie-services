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
} from '@nestjs/common';
import { StudiosService } from './studios.service';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';
import { Studio } from './entity/studio.entity';
import { makeResponse } from 'src/utils/http.utils';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('backoffice/studios')
export class StudiosController {
  constructor(private readonly studiosService: StudiosService) {}

  @Post()
  async create(@Res() res, @Body() createStudioDto: CreateStudioDto) {
    const studio: Studio = await this.studiosService.create(createStudioDto);
    return makeResponse(res, true, 200, studio, 'Operasi Berhasil');
  }

  @Get()
  async findAll(@Res() res) {
    const studios: Studio[] = await this.studiosService.findAll();
    return makeResponse(res, true, 200, studios, 'Operasi Berhasil');
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    const studio: Studio = await this.studiosService.findOne(+id);
    if (!studio)
      return makeResponse(
        res,
        false,
        404,
        { message: 'Studio tidak ditemukan' },
        'Operasi Gagal',
      );
    return makeResponse(res, true, 200, studio, 'Operasi Berhasil');
  }

  @Patch(':id')
  async update(
    @Res() res,
    @Param('id') id: string,
    @Body() updateStudioDto: UpdateStudioDto,
  ) {
    const updateResult: UpdateResult = await this.studiosService.update(
      +id,
      updateStudioDto,
    );

    if (updateResult.affected < 1)
      return makeResponse(res, false, 404, null, 'Studio Tidak Ditemukan');

    const studio: Studio = await this.studiosService.findOne(+id);
    return makeResponse(res, true, 200, studio, 'Operasi Berhasil');
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string) {
    const result: DeleteResult = await this.studiosService.remove(+id);

    if (result.affected < 1)
      throw new BadRequestException('Studio Tidak Ditemukan');

    return makeResponse(res, true, 200, null, 'Operasi Berhasil');
  }
}
