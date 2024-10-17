import { Module } from '@nestjs/common';
import {
  CounterRepository,
  ICounterRepository,
} from './repositories/counter.repository';
import { CounterService } from './services/counter.service';

@Module({
  providers: [
    {
      provide: ICounterRepository,
      useClass: CounterRepository,
    },
    CounterService,
  ],
  exports: [CounterService],
})
export class StepTrackingModule {}
