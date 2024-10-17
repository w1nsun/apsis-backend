import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from './infra/validation';
import { AllExceptionsFilter } from './infra/logger/allExceptions.filter';
import { AppContextMiddleware } from './infra/utils/appContext.middleware';
import { AppModule } from './app/app.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [InfraModule, DomainModule, AppModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class MainModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppContextMiddleware).forRoutes('*');
  }
}
