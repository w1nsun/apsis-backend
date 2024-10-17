import { Injectable } from '@nestjs/common';
import { Counter } from '../entities/counter.entity';

export interface ICounterRepository {
  save(counter: Counter): void;
  delete(id: string): boolean;
  findById(id: string): Counter | undefined;
  findAll(): Counter[];
}

export const ICounterRepository = Symbol('ICounterRepository');

@Injectable()
export class CounterRepository implements ICounterRepository {
  private counters: Counter[] = [];

  save(counter: Counter): void {
    this.counters.push(counter);
  }

  delete(id: string): boolean {
    const index = this.counters.findIndex((counter) => counter.id === id);
    if (index !== -1) {
      this.counters.splice(index, 1);
      return true;
    }
    return false;
  }

  findById(id: string): Counter | undefined {
    return this.counters.find((counter) => counter.id === id);
  }

  findAll(): Counter[] {
    return this.counters;
  }
}
