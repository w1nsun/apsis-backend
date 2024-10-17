import { Module } from '@nestjs/common';
import { LeaderboardService } from './services/leaderboard.service';
import { StepTrackingModule } from '../stepTracking/stepTracking.module';
import { TeamManagementModule } from '../teamManagement/teamManagement.module';

@Module({
  imports: [StepTrackingModule, TeamManagementModule],
  providers: [LeaderboardService],
  exports: [LeaderboardService],
})
export class LeaderboardModule {}
