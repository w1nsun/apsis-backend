import { ApiProperty } from '@nestjs/swagger';

export class StepsRespDto {
  @ApiProperty({
    description: 'Amount of steps',
    example: 1001,
  })
  steps_amount: number;
}

export class LeaderboardCounterRespDto extends StepsRespDto {
  @ApiProperty({
    description: 'ID',
    example: 'aad0ad1c-1c5b-47d7-afe9-e9bedb594ca9',
  })
  counter_id: string;
}

export class LeaderboardTeamRespDto extends StepsRespDto {
  @ApiProperty({
    description: 'ID',
    example: 'aad0ad1c-1c5b-47d7-afe9-e9bedb594ca9',
  })
  team_id: string;

  @ApiProperty({
    description: 'Team Name',
    example: 'Axel',
  })
  team_name: string;
}
