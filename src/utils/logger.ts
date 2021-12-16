import * as winston from 'winston';

const baseFormat = winston.format.combine(
  winston.format.label({ label: '[movies-service]' }),
  winston.format.errors({ stack: true }),
  winston.format.timestamp({
    format: 'MMM-DD-YYYY HH:mm:ss',
  }),
  winston.format.printf((info) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
  }),
);

export const logger = winston.createLogger({
  format: winston.format.combine(baseFormat),
  transports: [new winston.transports.File({ filename: 'activity.log' })],
});
