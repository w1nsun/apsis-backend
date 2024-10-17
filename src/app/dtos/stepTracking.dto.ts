import { ApiProperty } from '@nestjs/swagger';

export class CounterRespDto {
  @ApiProperty({
    description: 'ID',
    example: 'aad0ad1c-1c5b-47d7-afe9-e9bedb594ca9',
  })
  id: string;

  @ApiProperty({
    description: 'Team ID',
    example: 'ffd0ad1c-1c5b-47d7-afe9-e9bedb594ca8',
  })
  team_id: string;

  @ApiProperty({
    description: 'Employee ID',
    example: 'ddd0ad1c-1c5b-47d7-afe9-e9bedb594cc2',
  })
  employee_id: string;

  @ApiProperty({
    description: 'Amount of steps',
    example: 1001,
  })
  steps_amount: number;

  @ApiProperty({
    description: 'Created At',
    example: '2011-10-05T14:48:00.000Z',
  })
  created_at: string;
}
