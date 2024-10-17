import { ApiProperty } from '@nestjs/swagger';

class ValidationErrorDetailDto {
  @ApiProperty({ example: ['name'] })
  path: string[];

  @ApiProperty({ example: 'duplicate_team' })
  code: string;

  @ApiProperty({ example: 'The team already exists' })
  message: string;

  @ApiProperty({ example: 'Axel', required: false })
  email?: string;
}

export class ValidationErrorDto {
  @ApiProperty({ example: 'The team already exists' })
  message: string;

  @ApiProperty({ example: 'VALIDATION_FAILED' })
  code: string;

  @ApiProperty({ example: 400 })
  status_code: number;

  @ApiProperty({ example: '87119d39-337d-442e-a007-e90763c23b2a' })
  request_id: string;

  @ApiProperty({ type: [ValidationErrorDetailDto] })
  errors: ValidationErrorDetailDto[];
}
