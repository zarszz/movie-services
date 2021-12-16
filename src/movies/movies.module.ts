import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { MovietagsModule } from 'src/movietags/movietags.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), MovietagsModule],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [TypeOrmModule],
})
export class MoviesModule {}
