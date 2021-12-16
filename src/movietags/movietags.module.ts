import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieTag } from './entity/movietags.entity';
import { MovietagsService } from './movietags.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieTag])],
  providers: [MovietagsService],
  exports: [MovietagsModule],
})
export class MovietagsModule {}
