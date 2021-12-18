import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Seeder } from './seeders/seeder';
import { SeedersModule } from './seeders/seeders.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedersModule);
  const logger = appContext.get(Logger);
  const seeder = appContext.get(Seeder);
  try {
    if (await seeder.seed()) logger.debug('Seeding complete !!');
  } catch (error) {
    logger.error('Seeding failed :' + error.message);
  } finally {
    await appContext.close();
  }
}

bootstrap();
