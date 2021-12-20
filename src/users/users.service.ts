import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  update(id: number, user: User) {
    return this.userRepository.update({ id }, user);
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }
}
