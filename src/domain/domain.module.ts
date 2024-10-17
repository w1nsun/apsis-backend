import { Global, Module } from '@nestjs/common';
import { TeamManagementModule } from './teamManagement/teamManagement.module';
import { StepTrackingModule } from './stepTracking/stepTracking.module';

@Global()
@Module({
  imports: [StepTrackingModule, TeamManagementModule],
  exports: [StepTrackingModule, TeamManagementModule],
})
export class DomainModule {}
