import { Inject, Injectable } from '@nestjs/common';
import { ITeamRepository } from '../repositories/team.repository';
import { Team } from '../entities/team.entity';
import { IdHelper } from '../../../infra/utils/id.helper';
import { CreateTeamDto } from '../dtos/team.dto';
import { DuplicateTeamException } from '../exceptions/duplicateTeam.exception';

@Injectable()
export class TeamService {
  constructor(
    @Inject(ITeamRepository) private teamRepository: ITeamRepository,
  ) {}

  createTeam(dto: CreateTeamDto): Team {
    this._assertName(dto.name);

    const id = IdHelper.genID();
    const team = new Team(id, dto.name);

    this.teamRepository.save(team);

    return team;
  }

  deleteTeam(id: string): boolean {
    return this.teamRepository.delete(id);
  }

  private _assertName(name: string): void | never {
    const team = this.teamRepository.findByName(name);

    if (team) {
      throw new DuplicateTeamException({ name });
    }
  }
}
