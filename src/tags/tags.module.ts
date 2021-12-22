import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entity/tag.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { TagSeederService } from './tag.seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), UsersModule, AuthModule],
  controllers: [TagsController],
  providers: [TagsService, TagSeederService],
  exports: [TypeOrmModule, TagsService, TagSeederService],
})
export class TagsModule {}
