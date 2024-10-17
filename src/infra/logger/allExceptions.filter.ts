import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { ILoggerAwareRequest } from './types';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<ILoggerAwareRequest>();
    const status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const requestId = request?.ctx?.requestId;
    let logLevel = 'info';
    let code = exception.code;

    if (exception instanceof BadRequestException) {
      code = 'VALIDATION_FAILED';
    }

    if (exception instanceof NotFoundException) {
      logLevel = 'warn';
      code = exception['code'] || 'NOT_FOUND';
    }

    if (!code && status == 500) {
      logLevel = 'error';
      code = 'INTERNAL_SERVER_ERROR';
    }

    const error: Record<string, any> = {
      message: exception?.response?.error || exception.message,
      code: code,
      status_code: status,
      request_id: requestId,
    };

    if (exception?.response?.data) {
      error.data = exception?.response?.data;
    }

    if (exception?.response?.errors) {
      error.errors = exception.response.errors;
    }

    request.logger?.log(logLevel, 'AllExceptionsFilter', {
      exception: exception,
      error: {
        ...error,
        stack: exception?.stack,
      },
      ctx: { requestId },
    });

    response.status(status).json({ ...error });
  }
}
