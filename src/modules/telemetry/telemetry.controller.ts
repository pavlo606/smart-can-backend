import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TelemetryService } from './telemetry.service';
import { CreateTelemetryDto } from './dto/create-telemetry.dto';
import { UpdateTelemetryDto } from './dto/update-telemetry.dto';
import { QueryTelemetryDto } from './dto/query-telemetry.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { CurrentUser } from '@/common/decorators/current-user';
import type { JwtPayload } from '@/types/jwt-payload';

@ApiTags('Telemetry')
@Controller('telemetry')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
export class TelemetryController {
  constructor(private service: TelemetryService) {}

  @ApiOperation({ summary: 'Create telemetry' })
  @ApiResponse({ status: 201, description: 'Returns created telemetry data' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @Post()
  async create(@Body() dto: CreateTelemetryDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Get many telemetrys with search and pagination' })
  @ApiResponse({ status: 200, description: 'Returns telemetrys data' })
  @Get()
  async getAll(
    @Query() query: QueryTelemetryDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.service.getMany(query, user.userId);
  }

  @ApiOperation({ summary: 'Get telemetry by id' })
  @ApiResponse({ status: 200, description: 'Returns telemetry data' })
  @ApiResponse({ status: 404, description: 'No such telemetry' })
  @Get(':deviceId/:timestamp')
  async getById(
    @Param('deviceId') deviceId: string,
    @Param('timestamp') timestamp: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.service.getUnique(deviceId, timestamp, user.userId);
  }

  @ApiOperation({ summary: 'Update telemetry' })
  @ApiResponse({ status: 200, description: 'Updated successfuly' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 404, description: 'No such telemetry' })
  @Patch(':deviceId/:timestamp')
  async update(
    @Param('deviceId') deviceId: string,
    @Param('timestamp') timestamp: string,
    @Body() dto: UpdateTelemetryDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.service.update(deviceId, timestamp, dto, user.userId);
  }

  @ApiOperation({ summary: 'Delete telemetry' })
  @ApiResponse({ status: 200, description: 'Deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such telemetry' })
  @Delete(':deviceId/:timestamp')
  async delete(
    @Param('deviceId') deviceId: string,
    @Param('timestamp') timestamp: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.service.delete(deviceId, timestamp, user.userId);
  }
}
