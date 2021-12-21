import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Seeder } from './seeders/seeder';
import { SeedersModule } from './seeders/seeders.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedersModule);
  const logger = appContext.get(Logger);
  const seeder = appContext.get(Seeder);
  try {
    logger.log('Seeder : Seeder started....');
    if (await seeder.seed()) logger.debug('Seeder: Seeding complete !!');
  } catch (error) {
    logger.error('Seeding failed :' + error.message);
  } finally {
    logger.log('Seeder : Seeder finished....');
    await appContext.close();
  }
}

bootstrap();
