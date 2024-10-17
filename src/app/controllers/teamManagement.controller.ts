import { CreateTeamDto, TeamService } from '../../domain/teamManagement';
import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TeamDeleteRespDto, TeamRespDto } from '../dtos/teamManagement.dto';
import { ValidationErrorDto } from '../dtos/errors.dto';

@ApiTags('Team Management')
@Controller('teams')
export class TeamManagementController {
  constructor(private teamService: TeamService) {}

  @Post()
  @ApiResponse({ type: TeamRespDto, status: HttpStatus.CREATED })
  @ApiResponse({ type: ValidationErrorDto, status: HttpStatus.BAD_REQUEST })
  async createTeam(@Body() reqDto: CreateTeamDto): Promise<TeamRespDto> {
    const team = this.teamService.createTeam(reqDto);

    /**
     * Possible to move to Mapper
     */
    return {
      id: team.id,
      name: team.name,
      created_at: team.createdAt.toISOString(),
    };
  }

  @Delete(':id')
  @ApiResponse({ type: TeamDeleteRespDto, status: HttpStatus.OK })
  async deleteTeam(@Param('id') id: string): Promise<TeamDeleteRespDto> {
    const result = this.teamService.deleteTeam(id);

    return {
      ok: result,
    };
  }
}
