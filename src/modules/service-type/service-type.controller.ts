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
import { ServiceTypeService } from './service-type.service';
import { CreateServiceTypeDto } from './dto/create-service-type.dto';
import { UpdateServiceTypeDto } from './dto/update-service-type.dto';
import { QueryServiceTypeDto } from './dto/query-service-type.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { CurrentUser } from '@/common/decorators/current-user';
import type { JwtPayload } from '@/types/jwt-payload';

@ApiTags('ServiceType')
@Controller('servicetype')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
export class ServiceTypeController {
  constructor(private service: ServiceTypeService) {}

  @ApiOperation({ summary: 'Create servicetype' })
  @ApiResponse({ status: 201, description: 'Returns created servicetype data' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @Post()
  async create(@Body() dto: CreateServiceTypeDto, @CurrentUser() user: JwtPayload) {
    return this.service.create(dto, user.userId);
  }

  @ApiOperation({ summary: 'Get many servicetypes with search and pagination' })
  @ApiResponse({ status: 200, description: 'Returns servicetypes data' })
  @Get()
  async getAll(@Query() query: QueryServiceTypeDto, @CurrentUser() user: JwtPayload) {
    return this.service.getMany(query, user.userId);
  }

  @ApiOperation({ summary: 'Get servicetype by id' })
  @ApiResponse({ status: 200, description: 'Returns servicetype data' })
  @ApiResponse({ status: 404, description: 'No such servicetype' })
  @Get(':id')
  async getById(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.service.getById(id, user.userId);
  }

  @ApiOperation({ summary: 'Update servicetype' })
  @ApiResponse({ status: 200, description: 'Updated successfuly' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 404, description: 'No such servicetype' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateServiceTypeDto, @CurrentUser() user: JwtPayload) {
    return this.service.update(id, dto, user.userId);
  }

  @ApiOperation({ summary: 'Delete servicetype' })
  @ApiResponse({ status: 200, description: 'Deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such servicetype' })
  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.service.delete(id, user.userId);
  }
}
