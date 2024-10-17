import { ApiProperty } from '@nestjs/swagger';

export class DeleteRespDto {
  @ApiProperty({
    description: 'Is deleted?',
    example: true,
  })
  ok: boolean;
}
