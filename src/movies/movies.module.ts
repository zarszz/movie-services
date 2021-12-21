import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entity/movie.entity';
import { TagsModule } from 'src/tags/tags.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { MovieSeederService } from './move.seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    TagsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MovieSeederService],
  exports: [TypeOrmModule, MoviesService, MovieSeederService],
})
export class MoviesModule {}
