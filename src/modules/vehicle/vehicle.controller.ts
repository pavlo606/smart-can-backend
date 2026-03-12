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
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { QueryVehicleDto } from './dto/query-vehicle.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { CurrentUser } from '@/common/decorators/current-user';
import type { JwtPayload } from '@/types/jwt-payload';

@ApiTags('Vehicle')
@Controller('vehicle')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
export class VehicleController {
  constructor(private service: VehicleService) {}

  @ApiOperation({ summary: 'Create vehicle' })
  @ApiResponse({ status: 201, description: 'Returns created vehicle data' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @Post()
  async create(@Body() dto: CreateVehicleDto, @CurrentUser() user: JwtPayload) {
    return this.service.create(dto, user.userId);
  }

  @ApiOperation({ summary: 'Get many vehicles with search and pagination' })
  @ApiResponse({ status: 200, description: 'Returns vehicles data' })
  @Get()
  async getAll(@Query() query: QueryVehicleDto) {
    return this.service.getMany(query);
  }

  @ApiOperation({ summary: 'Get vehicle by id' })
  @ApiResponse({ status: 200, description: 'Returns vehicle data' })
  @ApiResponse({ status: 404, description: 'No such vehicle' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @ApiOperation({ summary: 'Update vehicle' })
  @ApiResponse({ status: 200, description: 'Updated successfuly' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 404, description: 'No such vehicle' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateVehicleDto) {
    return this.service.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete vehicle' })
  @ApiResponse({ status: 200, description: 'Deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such vehicle' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
