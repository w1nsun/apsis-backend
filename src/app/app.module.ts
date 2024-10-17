import { Module } from '@nestjs/common';
import { TeamManagementController } from './controllers/teamManagement.controller';
import { StepTrackingController } from './controllers/stepTracking.controller';

@Module({
  imports: [],
  controllers: [StepTrackingController, TeamManagementController],
  providers: [],
})
export class AppModule {}
