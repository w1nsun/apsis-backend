import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { LeaderboardService } from '../../domain/leaderboard/services/leaderboard.service';
import {
  LeaderboardCounterRespDto,
  LeaderboardTeamRespDto,
} from '../dtos/leaderboard.dto';
import { LeaderboardCounter } from '../../domain/leaderboard/entities/leaderboardCounter.entity';
import { LeaderboardTeam } from '../../domain/leaderboard/entities/leaderboardTeam.entity';

@ApiTags('Leaderboard')
@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get('teams/:teamId/total')
  async getTeamSteps(
    @Param('teamId') teamId: string,
  ): Promise<LeaderboardTeamRespDto> {
    const team = this.leaderboardService.getTeamSteps(teamId);

    return {
      team_id: team.teamId,
      team_name: team.teamName,
      steps_amount: team.stepsAmount,
    };
  }

  @Get('teams/:teamId')
  async getTeamCountersSteps(
    @Param('teamId') teamId: string,
  ): Promise<LeaderboardCounterRespDto[]> {
    const teamCountersSteps =
      this.leaderboardService.getTeamCountersSteps(teamId);

    return teamCountersSteps.map(
      (counter: LeaderboardCounter): LeaderboardCounterRespDto => {
        return {
          counter_id: counter.counterId,
          steps_amount: counter.stepsAmount,
        };
      },
    );
  }

  @Get('teams')
  async getTeamsSteps(): Promise<LeaderboardTeamRespDto[]> {
    const teamCountersSteps = await this.leaderboardService.getTeamsSteps();

    return teamCountersSteps.map(
      (team: LeaderboardTeam): LeaderboardTeamRespDto => {
        return {
          team_id: team.teamId,
          team_name: team.teamName,
          steps_amount: team.stepsAmount,
        };
      },
    );
  }
}
