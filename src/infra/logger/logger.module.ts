import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';
import { createLogger, format, transports } from 'winston';

import { configurableLimitValuesSize, Logger } from './logger.service';
import { NestLogger } from './nestLogger.service';
import { Config } from './types';

const { combine, timestamp, json } = format;

@Global()
@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [
    {
      provide: Logger,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const payloadSizeThreshold = config.getOrThrow<
          Config['payloadSizeThreshold']
        >('logger.payloadSizeThreshold');
        const limitValuesSize =
          configurableLimitValuesSize(payloadSizeThreshold);
        const consoleTransport = new transports.Console({
          silent: process.env['ENV'] === 'test',
        });

        return createLogger({
          level: config.get<Config['level']>('logger.level'),
          transports: [consoleTransport],
          format: combine(timestamp(), format(limitValuesSize)(), json()),
        });
      },
    },
    NestLogger,
  ],
  exports: [Logger, NestLogger],
})
export class LoggerModule {}
