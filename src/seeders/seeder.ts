import { Injectable, Logger } from '@nestjs/common';
import { UserSeederService } from 'src/users/user.seeder.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly userSeederService: UserSeederService,
  ) {}
  async seed() {
    try {
      return await this.users();
    } catch (error) {
      this.logger.error(error.message);
      return false;
    }
  }
  async users() {
    try {
      const usersCreated = await Promise.all(this.userSeederService.create());

      this.logger.debug(
        'No. of users created : ' +
          usersCreated.filter((created) => created).length,
      );
      return true;
    } catch (error) {
      this.logger.error(error.message);
      return false;
    }
  }
}
