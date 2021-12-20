import { Module } from '@nestjs/common';
import { StudiosService } from './studios.service';
import { StudiosController } from './studios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Studio } from './entity/studio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Studio])],
  controllers: [StudiosController],
  providers: [StudiosService],
  exports: [StudiosService],
})
export class StudiosModule {}
