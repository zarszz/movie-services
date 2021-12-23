import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { IUser, users } from './type/user.seeder';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(): Promise<User>[] {
    return users.map(async (user: IUser) => {
      user.password = await bcrypt.hash(user.password, 10);
      return await this.userRepository.save(<User>user);
    });
  }
}
