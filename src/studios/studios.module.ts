import { Module } from '@nestjs/common';
import { StudiosService } from './studios.service';
import { StudiosController } from './studios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Studio } from './entity/studio.entity';
import { StudioSeederService } from './studios.seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Studio])],
  controllers: [StudiosController],
  providers: [StudiosService, StudioSeederService],
  exports: [StudiosService, StudioSeederService],
})
export class StudiosModule {}
