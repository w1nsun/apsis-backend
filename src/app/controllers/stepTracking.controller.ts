import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationErrorDto } from '../dtos/errors.dto';
import { CounterService } from '../../domain/stepTracking';
import { DeleteRespDto } from '../dtos/common.dto';
import { CounterRespDto } from '../dtos/stepTracking.dto';
import { CreateCounterDto } from '../../domain/stepTracking/dtos/counter.dto';

@ApiTags('Step Tracking')
@Controller('teams')
export class StepTrackingController {
  constructor(private counterService: CounterService) {}

  @Post(':teamId/counters')
  @ApiResponse({ type: CounterRespDto, status: HttpStatus.CREATED })
  @ApiResponse({ type: ValidationErrorDto, status: HttpStatus.BAD_REQUEST })
  async createCounter(
    @Body() reqDto: CreateCounterDto,
    @Param('teamId') teamId: string,
  ): Promise<CounterRespDto> {
    const team = this.counterService.createCounter(teamId, reqDto);

    return {
      id: team.id,
      team_id: team.teamId,
      employee_id: team.employeeId,
      steps_amount: team.stepsAmount,
      created_at: team.createdAt.toISOString(),
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
}
