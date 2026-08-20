import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { QueryDeviceDto } from './dto/query-device.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { CurrentUser } from '@/common/decorators/current-user';
import type { JwtPayload } from '@/types/jwt-payload';
import { AuthDeviceDto } from './dto/auth-device.dto';

@ApiTags('Device')
@Controller('device')
export class DeviceController {
  constructor(private service: DeviceService) {}

  @ApiOperation({ summary: 'Create device' })
  @ApiResponse({ status: 201, description: 'Returns created device data' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async create(@Body() dto: CreateDeviceDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Log in device and return access token' })
  @ApiResponse({ status: 201, description: 'Returns access token' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post("auth")
  async auth(@Body() dto: AuthDeviceDto) {
    return this.service.auth(dto);
  }

  @ApiOperation({ summary: 'Get many devices with search and pagination' })
  @ApiResponse({ status: 200, description: 'Returns devices data' })
  @ApiResponse({ status: 400, description: 'Invalid query parameters' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getAll(@Query() query: QueryDeviceDto) {
    return this.service.getMany(query);
  }

  @ApiOperation({ summary: 'Get device by id' })
  @ApiResponse({ status: 200, description: 'Returns device data' })
  @ApiResponse({ status: 404, description: 'No such device' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  async getById(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.service.getById(id, user);
  }

  @ApiOperation({ summary: 'Update device' })
  @ApiResponse({ status: 200, description: 'Updated successfuly' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 404, description: 'No such device' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async update(@Param('id') id: string, @Body() dto: UpdateDeviceDto) {
    return this.service.update(id, dto);
  }

  @ApiOperation({ summary: 'Connect device to vehicle' })
  @ApiResponse({ status: 200, description: 'Updated successfuly' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 404, description: 'No such device or vehicle' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Patch('connect/vehicle/:vehicleId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  async connectVehicle(@Param('vehicleId') vehicleId: string, @Body() dto: AuthDeviceDto, @CurrentUser() user: JwtPayload) {
    return this.service.connectVehicle(vehicleId, dto, user.userId);
  }

  @ApiOperation({ summary: 'Delete device' })
  @ApiResponse({ status: 200, description: 'Deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such device' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
