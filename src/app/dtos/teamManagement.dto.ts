import { ApiProperty } from '@nestjs/swagger';

export class TeamRespDto {
  @ApiProperty({
    description: 'ID',
    example: 'ffd0ad1c-1c5b-47d7-afe9-e9bedb594ca8',
  })
  id: string;

  @ApiProperty({
    description: 'Name',
    example: 'Axel',
  })
  name: string;

  @ApiProperty({
    description: 'Created At',
    example: '2011-10-05T14:48:00.000Z',
  })
  created_at: string;
}
