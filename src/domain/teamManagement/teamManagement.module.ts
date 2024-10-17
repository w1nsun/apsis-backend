import { Module } from '@nestjs/common';
import {
  ITeamRepository,
  TeamRepository,
} from './repositories/team.repository';
import { TeamService } from './services/team.service';

@Module({
  providers: [
    {
      provide: ITeamRepository,
      useClass: TeamRepository,
    },
    TeamService,
  ],
  exports: [TeamService],
})
export class TeamManagementModule {}
