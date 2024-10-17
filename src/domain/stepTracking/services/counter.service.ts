import { Inject, Injectable } from '@nestjs/common';
import { ICounterRepository } from '../repositories/counter.repository';
import { CreateCounterDto } from '../dtos/counter.dto';
import { Counter } from '../entities/counter.entity';
import { IdHelper } from '../../../infra/utils/id.helper';

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
}
