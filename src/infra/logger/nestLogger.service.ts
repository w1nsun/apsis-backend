import { Injectable, LoggerService } from '@nestjs/common';

import { Logger } from './logger.service';

@Injectable()
export class NestLogger implements LoggerService {
  constructor(private readonly logger: Logger) {}

  log(message: any, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: any, context?: any) {
    this.logger.error(message, { context });
  }

  warn(message: any, context?: any) {
    this.logger.warn(message, { context });
  }

  debug(message: any, context?: any) {
    this.logger.debug(message, { context });
  }

  verbose(message: any, context?: any) {
    this.logger.verbose(message, { context });
  }
}
