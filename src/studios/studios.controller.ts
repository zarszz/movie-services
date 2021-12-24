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
import { StudiosService } from './studios.service';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';
import { Studio } from './entity/studio.entity';
import { makeResponse } from 'src/utils/http.utils';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AdminGuard } from 'src/auth/auth.guard';

@Controller({ path: 'backoffice/studios', version: '1' })
export class StudiosController {
  constructor(private readonly studiosService: StudiosService) {}

  @Post()
  @UseGuards(AdminGuard)
  async create(@Res() res, @Body() createStudioDto: CreateStudioDto) {
    const studio: Studio = await this.studiosService.create(createStudioDto);
    return makeResponse(res, true, 200, studio, 'Operasi Berhasil');
  }

  @Get()
  @UseGuards(AdminGuard)
  async findAll(@Res() res) {
    const studios: Studio[] = await this.studiosService.findAll();
    return makeResponse(res, true, 200, studios, 'Operasi Berhasil');
  }

  @Get(':id')
  @UseGuards(AdminGuard)
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
  @UseGuards(AdminGuard)
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
  @UseGuards(AdminGuard)
  async remove(@Res() res, @Param('id') id: string) {
    const result: DeleteResult = await this.studiosService.remove(+id);

    if (result.affected < 1)
      throw new BadRequestException('Studio Tidak Ditemukan');

    return makeResponse(res, true, 200, null, 'Operasi Berhasil');
  }
}
