import { Logger, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmProviderModule } from './provider.module';
import { Seeder } from './seeder';

@Module({
  imports: [UsersModule, TypeOrmProviderModule],
  providers: [Logger, Seeder],
})
export class SeedersModule {}
