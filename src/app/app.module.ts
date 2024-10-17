import { Module } from '@nestjs/common';
import { TeamManagementController } from './controllers/teamManagement.controller';
import { StepTrackingController } from './controllers/stepTracking.controller';
import { LeaderboardController } from './controllers/leaderboard.controller';

@Module({
  imports: [],
  controllers: [
    StepTrackingController,
    TeamManagementController,
    LeaderboardController,
  ],
  providers: [],
})
export class AppModule {}
