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
import { ServiceIntervalService } from './service-interval.service';
import { CreateServiceIntervalDto } from './dto/create-service-interval.dto';
import { UpdateServiceIntervalDto } from './dto/update-service-interval.dto';
import { QueryServiceIntervalDto } from './dto/query-service-interval.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { CurrentUser } from '@/common/decorators/current-user';
import type { JwtPayload } from '@/types/jwt-payload';
import { QueryUniqueServiceIntervalDto } from './dto/query-unique-service-interval.dto';

@ApiTags('ServiceInterval')
@Controller('serviceinterval')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
export class ServiceIntervalController {
  constructor(private service: ServiceIntervalService) {}

  @ApiOperation({ summary: 'Create serviceinterval' })
  @ApiResponse({ status: 201, description: 'Returns created serviceinterval data' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @Post()
  async create(@Body() dto: CreateServiceIntervalDto, @CurrentUser() user: JwtPayload) {
    return this.service.create(dto, user.userId);
  }

  @ApiOperation({ summary: 'Get many serviceintervals with search and pagination' })
  @ApiResponse({ status: 200, description: 'Returns serviceintervals data' })
  @Get()
  async getAll(@Query() query: QueryServiceIntervalDto, @CurrentUser() user: JwtPayload) {
    return this.service.getMany(query, user.userId);
  }

  @ApiOperation({ summary: 'Get serviceinterval by id' })
  @ApiResponse({ status: 200, description: 'Returns serviceinterval data' })
  @ApiResponse({ status: 404, description: 'No such serviceinterval' })
  @Get('unique/:id')
  async getById(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.service.getById(id, user.userId);
  }

  @ApiOperation({ summary: 'Get serviceinterval by id' })
  @ApiResponse({ status: 200, description: 'Returns serviceinterval data' })
  @ApiResponse({ status: 404, description: 'No such serviceinterval' })
  @Get('unique')
  async getByVehicleAndType(@Query() query: QueryUniqueServiceIntervalDto, @CurrentUser() user: JwtPayload) {
    return this.service.getByVehicleAndType(query, user.userId);
  }

  @ApiOperation({ summary: 'Update serviceinterval' })
  @ApiResponse({ status: 200, description: 'Updated successfuly' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 404, description: 'No such serviceinterval' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateServiceIntervalDto, @CurrentUser() user: JwtPayload) {
    return this.service.update(id, dto, user.userId);
  }

  @ApiOperation({ summary: 'Delete serviceinterval' })
  @ApiResponse({ status: 200, description: 'Deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such serviceinterval' })
  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.service.delete(id, user.userId);
  }
}
