import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICounterRepository } from '../repositories/counter.repository';
import { CreateCounterDto, IncrementCounterDto } from '../dtos/counter.dto';
import { Counter } from '../entities/counter.entity';
import { IdHelper } from '../../../infra/utils/id.helper';
import { StepsAmountOverflowException } from '../exceptions/stepsAmountOverflow.exception';

@Injectable()
export class CounterService {
  constructor(
    @Inject(ICounterRepository) private counterRepository: ICounterRepository,
  ) {}

  createCounter(teamId: string, dto: CreateCounterDto): Counter {
    const id = IdHelper.genID();

    const counter = new Counter(id, teamId, dto.employee_id, dto.steps_amount);
    this.counterRepository.save(counter);

    return counter;
  }

  deleteCounter(id: string): boolean {
    return this.counterRepository.delete(id);
  }

  incrementCounter(counterId: string, dto: IncrementCounterDto): Counter {
    const counter = this.counterRepository.findById(counterId);
    if (!counter) {
      throw new NotFoundException(`Counter with id ${counterId} not found`);
    }

    this._assertStepsAmount(counter.stepsAmount, dto.increase_by);

    counter.stepsAmount += dto.increase_by;

    return counter;
  }

  private _assertStepsAmount(
    currentValue: number,
    increaseBy: number,
  ): void | never {
    if (currentValue + increaseBy > Number.MAX_SAFE_INTEGER) {
      throw new StepsAmountOverflowException({ increaseBy });
    }
  }
}
