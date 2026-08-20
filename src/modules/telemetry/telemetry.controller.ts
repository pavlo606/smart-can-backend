import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TelemetryService } from './telemetry.service';
import { CreateTelemetryDto, CreateTelemetryManyDto } from './dto/create-telemetry.dto';
import { UpdateTelemetryDto } from './dto/update-telemetry.dto';
import { QueryTelemetryDto } from './dto/query-telemetry.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { DeleteManyDto } from './dto/delete-many-telemetry.dto';
import { DeviceJwtAuthGuard } from '../device/guards/device-jwt.guard';
import { CurrentDevice } from '@/common/decorators/current-device';
import { type DeviceJwtPayload } from '../device/dto/device-jwt-payload.dto';
import { CurrentUser } from '@/common/decorators/current-user';
import { type JwtPayload } from '@/types/jwt-payload';

@ApiTags('Telemetry')
@Controller('telemetry')
export class TelemetryController {
  constructor(private service: TelemetryService) {}

  @ApiBearerAuth('device-auth')
  @ApiOperation({ summary: 'Create telemetry' })
  @ApiResponse({ status: 201, description: 'Returns created telemetry data' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  @UseGuards(DeviceJwtAuthGuard)
  async create(@CurrentDevice() device: DeviceJwtPayload, @Body() dto: CreateTelemetryDto) {
    return this.service.create(dto, device.deviceId);
  }
  
  @ApiBearerAuth('device-auth')
  @ApiOperation({ summary: 'Create many telemetry' })
  @ApiResponse({ status: 201, description: 'Returns created telemetry data' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post("many")
  @UseGuards(DeviceJwtAuthGuard)
  async createMany(@CurrentDevice() device: DeviceJwtPayload, @Body() dto: CreateTelemetryManyDto) {
    return this.service.createMany(dto, device.deviceId)
  }

  @ApiOperation({ summary: 'Get many telemetries within deviceId and timeframe' })
  @ApiResponse({ status: 200, description: 'Returns telemetries data' })
  @ApiResponse({ status: 400, description: 'Invalid query params' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  async getAll(@Query() query: QueryTelemetryDto, @CurrentUser() user: JwtPayload) {
    return this.service.getMany(query, user.userId);
  }

  @ApiOperation({ summary: 'Get telemetry by deviceId and timestamp' })
  @ApiResponse({ status: 200, description: 'Returns telemetry data' })
  @ApiResponse({ status: 404, description: 'No such telemetry' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get(':deviceId/:timestamp')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  async getById(@Param('deviceId') deviceId: string, @Param('timestamp') timestamp: string, @CurrentUser() user: JwtPayload) {
    return this.service.getUnique(deviceId, timestamp, user.userId);
  }

  @ApiOperation({ summary: 'Update telemetry' })
  @ApiResponse({ status: 200, description: 'Updated successfuly' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 404, description: 'No such telemetry' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Patch(':deviceId/:timestamp')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  async update(
    @Param('deviceId') deviceId: string,
    @Param('timestamp') timestamp: string,
    @Body() dto: UpdateTelemetryDto,
    @CurrentUser() user: JwtPayload
  ) {
    return this.service.update(deviceId, timestamp, dto, user.userId);
  }

  @ApiOperation({ summary: 'Delete telemetry' })
  @ApiResponse({ status: 200, description: 'Deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such telemetry' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete(':deviceId/:timestamp')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  async delete(@Param('deviceId') deviceId: string, @Param('timestamp') timestamp: string, @CurrentUser() user: JwtPayload) {
    return this.service.delete(deviceId, timestamp, user.userId);
  }

  @ApiOperation({ summary: 'Delete many telemetry by deviceId and timeframe' })
  @ApiResponse({ status: 200, description: 'Deleted successfuly' })
  @ApiResponse({ status: 400, description: 'Invalid query params' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete('many')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  async deleteMany(@Query() query: DeleteManyDto, @CurrentUser() user: JwtPayload) {
    return this.service.deleteMany(query, user.userId);
  }
}
