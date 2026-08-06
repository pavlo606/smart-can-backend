import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TelemetryService } from './telemetry.service';
import { CreateTelemetryDto, CreateTelemetryManyDto } from './dto/create-telemetry.dto';
import { UpdateTelemetryDto } from './dto/update-telemetry.dto';
import { QueryTelemetryDto } from './dto/query-telemetry.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { DeleteManyDto } from './dto/delete-many-telemetry.dto';

@ApiTags('Telemetry')
@Controller('telemetry')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
export class TelemetryController {
  constructor(private service: TelemetryService) {}

  @ApiOperation({ summary: 'Create telemetry' })
  @ApiResponse({ status: 201, description: 'Returns created telemetry data' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  async create(@Body() dto: CreateTelemetryDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Create many telemetry' })
  @ApiResponse({ status: 201, description: 'Returns created telemetry data' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post("many")
  async createMany(@Body() dto: CreateTelemetryManyDto) {
    return this.service.createMany(dto)
  }

  @ApiOperation({ summary: 'Get many telemetries within deviceId and timeframe' })
  @ApiResponse({ status: 200, description: 'Returns telemetries data' })
  @ApiResponse({ status: 400, description: 'Invalid query params' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get()
  async getAll(@Query() query: QueryTelemetryDto) {
    return this.service.getMany(query);
  }

  @ApiOperation({ summary: 'Get telemetry by deviceId and timestamp' })
  @ApiResponse({ status: 200, description: 'Returns telemetry data' })
  @ApiResponse({ status: 404, description: 'No such telemetry' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get(':deviceId/:timestamp')
  async getById(@Param('deviceId') deviceId: string, @Param('timestamp') timestamp: string) {
    return this.service.getUnique(deviceId, timestamp);
  }

  @ApiOperation({ summary: 'Update telemetry' })
  @ApiResponse({ status: 200, description: 'Updated successfuly' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 404, description: 'No such telemetry' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Patch(':deviceId/:timestamp')
  async update(
    @Param('deviceId') deviceId: string,
    @Param('timestamp') timestamp: string,
    @Body() dto: UpdateTelemetryDto,
  ) {
    return this.service.update(deviceId, timestamp, dto);
  }

  @ApiOperation({ summary: 'Delete telemetry' })
  @ApiResponse({ status: 200, description: 'Deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such telemetry' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete(':deviceId/:timestamp')
  async delete(@Param('deviceId') deviceId: string, @Param('timestamp') timestamp: string) {
    return this.service.delete(deviceId, timestamp);
  }

  @ApiOperation({ summary: 'Delete many telemetry by deviceId and timeframe' })
  @ApiResponse({ status: 200, description: 'Deleted successfuly' })
  @ApiResponse({ status: 400, description: 'Invalid query params' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete('many')
  async deleteMany(@Query() query: DeleteManyDto) {
    return this.service.deleteMany(query);
  }
}
