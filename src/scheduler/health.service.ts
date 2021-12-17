import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { logger } from 'src/utils/logger';

@Injectable()
export class HealthService {
  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    logger.info('OK');
  }
}
