import { Injectable, NestMiddleware } from '@nestjs/common';
import { v4 } from 'uuid';

import { Logger, LoggerContext } from '../logger';

@Injectable()
export class AppContextMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: any, res: any, next: (error?: any) => void): void {
    req.logger = this.logger;
    req.ctx = new LoggerContext(v4());

    res.header('x-request-id', req.ctx.requestId);

    next();
  }
}
