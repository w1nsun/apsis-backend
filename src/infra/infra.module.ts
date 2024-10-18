import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { LoggerModule } from './logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.production', '.env.development.local'],
      load: [configuration],
      isGlobal: true,
    }),
    LoggerModule,
  ],
})
export class InfraModule {}
