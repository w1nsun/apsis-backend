import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator for extracting ctx from request in controller
 */
export const Ctx = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.ctx;
  },
);
