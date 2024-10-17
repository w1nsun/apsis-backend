import { Injectable, NotFoundException } from '@nestjs/common';
import { Team, TeamService } from '../../teamManagement';
import { Counter, CounterService } from '../../stepTracking';
import { LeaderboardCounter } from '../entities/leaderboardCounter.entity';
import { LeaderboardTeam } from '../entities/leaderboardTeam.entity';

@Injectable()
export class LeaderboardService {
  constructor(
    private teamService: TeamService,
    private counterService: CounterService,
  ) {}

  getTeamSteps(teamId: string): LeaderboardTeam {
    const team = this._getTeam(teamId);

    const teamCounters = this.counterService.findByTeam(teamId);

    const teamSteps = teamCounters.reduce(
      (accumulator: number, counter: Counter): number => {
        return accumulator + counter.stepsAmount;
      },
      0,
    );

    return new LeaderboardTeam(team.id, team.name, teamSteps);
  }

  getTeamCountersSteps(teamId: string): LeaderboardCounter[] {
    this._getTeam(teamId);

    const teamCounters = this.counterService.findByTeam(teamId);

    return teamCounters.map((counter: Counter): LeaderboardCounter => {
      return new LeaderboardCounter(counter.id, counter.stepsAmount);
    });
  }

  async getTeamsSteps(): Promise<LeaderboardTeam[]> {
    const teams = this.teamService.findAll();

    const asyncCalculations = teams.map(
      async (team: Team): Promise<LeaderboardTeam> => {
        const teamCounters = this.counterService.findByTeam(team.id);

        const teamSteps = teamCounters.reduce(
          (accumulator: number, counter: Counter): number => {
            return accumulator + counter.stepsAmount;
          },
          0,
        );

        return new LeaderboardTeam(team.id, team.name, teamSteps);
      },
    );

    return await Promise.all(asyncCalculations);
  }

  private _getTeam(teamId: string): Team | never {
    const team = this.teamService.findById(teamId);

    if (!team) {
      throw new NotFoundException(`Team with id ${teamId} not found`);
    }

    return team;
  }
}
