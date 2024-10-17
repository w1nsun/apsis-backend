import { BadRequestException, HttpStatus } from '@nestjs/common';

type DuplicateTeamData = {
  name: string;
};

export class DuplicateTeamException extends BadRequestException {
  static readonly MESSAGE = 'The team already exists';
  static readonly CODE = 'duplicate_team';
  data: DuplicateTeamData;

  constructor(data: DuplicateTeamData) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      message: DuplicateTeamException.MESSAGE,
      errors: [
        {
          path: ['name'],
          code: DuplicateTeamException.CODE,
          message: DuplicateTeamException.MESSAGE,
          email: data.name,
        },
      ],
    });
    this.data = data;
  }
}
