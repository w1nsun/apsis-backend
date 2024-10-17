import { Injectable } from '@nestjs/common';
import { Team } from '../entities/team.entity';

export interface ITeamRepository {
  save(team: Team): void;
  delete(id: string): boolean;
  findById(id: string): Team | undefined;
  findByName(name: string): Team | undefined;
  findAll(): Team[];
}

export const ITeamRepository = Symbol('ITeamRepository');

@Injectable()
export class TeamRepository implements ITeamRepository {
  private teams: Team[] = [];

  save(team: Team): void {
    this.teams.push(team);
  }

  delete(id: string): boolean {
    const index = this.teams.findIndex((team) => team.id === id);
    if (index !== -1) {
      this.teams.splice(index, 1);
      return true;
    }
    return false;
  }

  findById(id: string): Team | undefined {
    return this.teams.find((team) => team.id === id);
  }

  findByName(name: string): Team | undefined {
    return this.teams.find((team) => team.name === name);
  }

  findAll(): Team[] {
    return this.teams;
  }
}
