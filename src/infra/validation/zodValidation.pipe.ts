import { ZodDtoStatic } from '@anatine/zod-nestjs';
import { HTTP_ERRORS_BY_CODE } from '@anatine/zod-nestjs/src/lib/http-errors';
import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  Optional,
  PipeTransform,
} from '@nestjs/common';

export interface ZodValidationPipeOptions {
  errorHttpStatusCode?: keyof typeof HTTP_ERRORS_BY_CODE;
}

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  private readonly errorHttpStatusCode: keyof typeof HTTP_ERRORS_BY_CODE;

  constructor(@Optional() options?: ZodValidationPipeOptions) {
    this.errorHttpStatusCode =
      options?.errorHttpStatusCode || HttpStatus.BAD_REQUEST;
  }

  public transform(value: unknown, metadata: ArgumentMetadata): unknown {
    const zodSchema = (metadata?.metatype as ZodDtoStatic)?.zodSchema;

    if (zodSchema) {
      const parseResult = zodSchema.safeParse(value);

      if (!parseResult.success) {
        const { error } = parseResult;

        throw new HTTP_ERRORS_BY_CODE[this.errorHttpStatusCode]({
          message: 'Validation failed',
          errors: error.errors,
        });
      }

      return parseResult.data;
    }

    return value;
  }
}
