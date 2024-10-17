import { BadRequestException, HttpStatus } from '@nestjs/common';

type StepsAmountOverflowData = {
  increaseBy: number;
};

export class StepsAmountOverflowException extends BadRequestException {
  static readonly MESSAGE = 'Maximum steps limit exceeded';
  static readonly CODE = 'steps_amount_overflow';
  data: StepsAmountOverflowData;

  constructor(data: StepsAmountOverflowData) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      message: StepsAmountOverflowException.MESSAGE,
      errors: [
        {
          path: ['increase_by'],
          code: StepsAmountOverflowException.CODE,
          message: StepsAmountOverflowException.MESSAGE,
          increase_by: data.increaseBy,
        },
      ],
    });
    this.data = data;
  }
}
