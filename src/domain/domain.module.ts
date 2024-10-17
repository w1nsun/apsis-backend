import { Global, Module } from '@nestjs/common';
import { TeamManagementModule } from './teamManagement/teamManagement.module';
import { StepTrackingModule } from './stepTracking/stepTracking.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';

@Global()
@Module({
  imports: [StepTrackingModule, TeamManagementModule, LeaderboardModule],
  exports: [StepTrackingModule, TeamManagementModule, LeaderboardModule],
})
export class DomainModule {}
