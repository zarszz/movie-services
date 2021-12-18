import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { IUser, users } from './entities/user.seeder';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(): Promise<User>[] {
    return users.map(async (user: IUser) => {
      return await this.userRepository.save(<User>user);
    });
  }
}
