import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const CreateCounterZodSchema = extendApi(
  z
    .object({
      employee_id: extendApi(
        z
          .string()
          .min(36)
          .max(36)
          .regex(
            /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
            {
              message: 'It should be UUID v4',
            },
          ),
        {
          example: '87119d39-337d-442e-a007-e90763c23b2a',
        },
      ),
      steps_amount: extendApi(
        z
          .number()
          .int()
          .min(0)
          .max(Number.MAX_SAFE_INTEGER)
          .default(0)
          .optional(),
        {
          example: 1001,
          default: 0,
        },
      ),
    })
    .required(),
);

export class CreateCounterDto extends createZodDto(CreateCounterZodSchema) {}

export const IncrementCounterZodSchema = extendApi(
  z
    .object({
      increase_by: extendApi(
        z
          .number()
          .int()
          .min(1)
          .max(Number.MAX_SAFE_INTEGER - 1),
        {
          example: 1001,
        },
      ),
    })
    .required(),
);

export class IncrementCounterDto extends createZodDto(
  IncrementCounterZodSchema,
) {}
