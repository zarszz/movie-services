import { Injectable, Logger } from '@nestjs/common';
import { TagSeederService } from 'src/tags/tag.seeder.service';
import { UserSeederService } from 'src/users/user.seeder.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly userSeederService: UserSeederService,
    private readonly tagSeederService: TagSeederService,
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
    } catch (error) {
      this.logger.error(error.message);
      return false;
    }
  }
}
