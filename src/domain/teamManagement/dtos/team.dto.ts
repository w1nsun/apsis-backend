import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const CreateTeamZodSchema = extendApi(
  z
    .object({
      name: extendApi(
        z
          .string()
          .min(1)
          .max(64)
          .regex(/^[\p{L}\s'-]+$/u, {
            message:
              'Only letters, spaces, dashes, and apostrophes are allowed.',
          }),
        {
          example: 'Axel',
        },
      ),
    })
    .required(),
);

export class CreateTeamDto extends createZodDto(CreateTeamZodSchema) {}
