import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationErrorDto } from '../dtos/errors.dto';
import { DeleteRespDto } from '../dtos/common.dto';
import { CounterRespDto } from '../dtos/stepTracking.dto';
import {
  CounterService,
  CreateCounterDto,
  IncrementCounterDto,
} from '../../domain/stepTracking';
import { TeamService } from '../../domain/teamManagement';

@ApiTags('Step Tracking')
@Controller('teams')
export class StepTrackingController {
  constructor(
    private counterService: CounterService,
    private teamService: TeamService,
  ) {}

  @Post(':teamId/counters')
  @ApiResponse({ type: CounterRespDto, status: HttpStatus.CREATED })
  @ApiResponse({ type: ValidationErrorDto, status: HttpStatus.BAD_REQUEST })
  async createCounter(
    @Body() reqDto: CreateCounterDto,
    @Param('teamId') teamId: string,
  ): Promise<CounterRespDto> {
    const team = this.teamService.findById(teamId);
    if (!team) {
      throw new NotFoundException(`Team with id ${teamId} not found`);
    }

    const counter = this.counterService.createCounter(teamId, reqDto);

    return {
      id: counter.id,
      team_id: counter.teamId,
      employee_id: counter.employeeId,
      steps_amount: counter.stepsAmount,
      created_at: counter.createdAt.toISOString(),
    };
  }

  @Delete(':teamId/counters/:counterId')
  @ApiResponse({ type: DeleteRespDto, status: HttpStatus.OK })
  async deleteCounter(@Param('counterId') id: string): Promise<DeleteRespDto> {
    const result = this.counterService.deleteCounter(id);

    return {
      ok: result,
    };
  }

  @Patch(':teamId/counters/:counterId/increment')
  @ApiResponse({ type: CounterRespDto, status: HttpStatus.OK })
  @ApiResponse({ type: ValidationErrorDto, status: HttpStatus.BAD_REQUEST })
  async incrementCounter(
    @Body() reqDto: IncrementCounterDto,
    @Param('counterId') counterId: string,
  ): Promise<CounterRespDto> {
    const counter = this.counterService.incrementCounter(counterId, reqDto);

    return {
      id: counter.id,
      team_id: counter.teamId,
      employee_id: counter.employeeId,
      steps_amount: counter.stepsAmount,
      created_at: counter.createdAt.toISOString(),
    };
  }
}
