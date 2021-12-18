import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return <TypeOrmModuleOptions>Object.assign(
          await getConnectionOptions(),
          {
            autoLoadEntities: true,
          },
        );
      },
    }),
  ],
})
export class TypeOrmProviderModule {}
