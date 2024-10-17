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
import { TeamRespDto } from '../dtos/teamManagement.dto';
import { ValidationErrorDto } from '../dtos/errors.dto';
import { DeleteRespDto } from '../dtos/common.dto';

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
  @ApiResponse({ type: DeleteRespDto, status: HttpStatus.OK })
  async deleteTeam(@Param('id') id: string): Promise<DeleteRespDto> {
    const result = this.teamService.deleteTeam(id);

    return {
      ok: result,
    };
  }
}
