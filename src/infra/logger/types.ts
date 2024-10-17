import { Request } from 'express';
import { z } from 'zod';

import { Logger } from './logger.service';

export interface LogCtx {
  [key: string]: any;
}

export const loggerConfigSchema = z.object({
  level: z.string().default('debug'),
  payloadSizeThreshold: z.number().default(10000),
});

export type Config = z.infer<typeof loggerConfigSchema>;

export interface ICtx {
  requestId: string;
  [key: string]: any;
}

export interface ILoggerAwareRequest extends Request {
  logger: Logger;
  ctx: ICtx;
}
