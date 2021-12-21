import { Injectable, Logger } from '@nestjs/common';
import { MovieSeederService } from 'src/movies/move.seeder.service';
import { MovieScheduleSeederService } from 'src/movieschedules/movieschedules.seeder.service';
import { OrderSeederService } from 'src/orders/orders.seeder.service';
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
    private readonly movieScheduleSeederService: MovieScheduleSeederService,
    private readonly orderSeederService: OrderSeederService,
  ) {}
  async seed() {
    try {
      const usersCreated = await Promise.all(this.userSeederService.create());
      this.logger.log(
        'Seeder: No. of users created : ' +
          usersCreated.filter((created) => created).length,
      );

      const tagsCreated = await Promise.all(this.tagSeederService.create());
      this.logger.log(
        'Seeder: No. of tags created : ' +
          tagsCreated.filter((tag) => tag).length,
      );

      const moviessCreated = await Promise.all(
        this.movieSeederService.create(),
      );
      this.logger.log(
        'Seeder: No. of movies created : ' +
          moviessCreated.filter((tag) => tag).length,
      );

      const studioCreated = await Promise.all(
        this.studioSeederService.create(),
      );
      this.logger.log(
        'Seeder: No. of studios created : ' +
          studioCreated.filter((studio) => studio).length,
      );

      const schedulesCreated = await Promise.all(
        this.movieScheduleSeederService.create(),
      );
      this.logger.log(
        'Seeder: No. of schedule created : ' +
          schedulesCreated.filter((schedule) => schedule).length,
      );

      const ordersCreated = await Promise.all(this.orderSeederService.create());
      this.logger.log(
        'Seeder: No. of orders created : ' +
          ordersCreated.filter((order) => order).length,
      );
      return true;
    } catch (error) {
      this.logger.error(error.message);
      return false;
    }
  }
}
