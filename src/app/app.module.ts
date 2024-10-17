import { Module } from '@nestjs/common';
import { TeamManagementController } from './controllers/teamManagement.controller';

@Module({
  imports: [],
  controllers: [TeamManagementController],
  providers: [],
})
export class AppModule {}
