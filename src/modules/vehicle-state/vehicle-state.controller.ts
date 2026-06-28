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
import { VehicleStateService } from './vehicle-state.service';
import { CreateVehicleStateDto } from './dto/create-vehicle-state.dto';
import { UpdateVehicleStateDto } from './dto/update-vehicle-state.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { CurrentUser } from '@/common/decorators/current-user';
import type { JwtPayload } from '@/types/jwt-payload';

@ApiTags('VehicleState')
@Controller('vehiclestate')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
export class VehicleStateController {
  constructor(private service: VehicleStateService) {}

  @ApiOperation({ summary: 'Create vehiclestate' })
  @ApiResponse({ status: 201, description: 'Returns created vehiclestate data' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @Post()
  async create(@Body() dto: CreateVehicleStateDto, @CurrentUser() user: JwtPayload) {
    return this.service.create(dto, user.userId);
  }

  @ApiOperation({ summary: 'Get vehicleState by vehicleId' })
  @ApiResponse({ status: 200, description: 'Returns vehiclestate data' })
  @ApiResponse({ status: 404, description: 'No such vehiclestate' })
  @Get(':vehicleId')
  async getById(@Param('vehicleId') vehicleId: string, @CurrentUser() user: JwtPayload) {
    return this.service.getById(vehicleId, user.userId);
  }

  @ApiOperation({ summary: 'Update vehiclestate' })
  @ApiResponse({ status: 200, description: 'Updated successfuly' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 404, description: 'No such vehiclestate' })
  @Patch(':vehicleId')
  async update(@Param('vehicleId') vehicleId: string, @Body() dto: UpdateVehicleStateDto, @CurrentUser() user: JwtPayload) {
    return this.service.update(vehicleId, dto, user.userId);
  }

  @ApiOperation({ summary: 'Delete vehiclestate' })
  @ApiResponse({ status: 200, description: 'Deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such vehiclestate' })
  @Delete(':vehicleId')
  async delete(@Param('vehicleId') vehicleId: string, @CurrentUser() user: JwtPayload) {
    return this.service.delete(vehicleId, user.userId);
  }
}
