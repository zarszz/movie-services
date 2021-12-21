import { Injectable, Logger } from '@nestjs/common';
import { MovieSeederService } from 'src/movies/move.seeder.service';
import { StudioSeederService } from 'src/studios/studios.seeder.service';
import { TagSeederService } from 'src/tags/tag.seeder.service';
import { UserSeederService } from 'src/users/user.seeder.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly userSeederService: UserSeederService,
    private readonly tagSeederService: TagSeederService,
    private readonly movieSeederService: MovieSeederService,
    private readonly studioSeederService: StudioSeederService,
  ) {}
  async seed() {
    try {
      const usersCreated = await Promise.all(this.userSeederService.create());
      this.logger.debug(
        'No. of users created : ' +
          usersCreated.filter((created) => created).length,
      );

      const tagsCreated = await Promise.all(this.tagSeederService.create());
      this.logger.debug(
        'No. of tags created : ' + tagsCreated.filter((tag) => tag).length,
      );

      const moviessCreated = await Promise.all(
        this.movieSeederService.create(),
      );
      this.logger.debug(
        'No. of movies created : ' + moviessCreated.filter((tag) => tag).length,
      );

      const studioCreated = await Promise.all(
        this.studioSeederService.create(),
      );
      this.logger.debug(
        'No. of studios created : ' +
          studioCreated.filter((studio) => studio).length,
      );
    } catch (error) {
      this.logger.error(error.message);
      return false;
    }
  }
}
