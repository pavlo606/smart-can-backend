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
import { ServiceRecordService } from './service-record.service';
import { CreateServiceRecordDto } from './dto/create-service-record.dto';
import { UpdateServiceRecordDto } from './dto/update-service-record.dto';
import { QueryServiceRecordDto } from './dto/query-service-record.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { CurrentUser } from '@/common/decorators/current-user';
import type { JwtPayload } from '@/types/jwt-payload';

@ApiTags('ServiceRecord')
@Controller('servicerecord')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
export class ServiceRecordController {
  constructor(private service: ServiceRecordService) {}

  @ApiOperation({ summary: 'Create servicerecord' })
  @ApiResponse({ status: 201, description: 'Returns created servicerecord data' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @Post()
  async create(@Body() dto: CreateServiceRecordDto, @CurrentUser() user: JwtPayload) {
    return this.service.create(dto, user.userId);
  }

  @ApiOperation({ summary: 'Get many servicerecords with search and pagination' })
  @ApiResponse({ status: 200, description: 'Returns servicerecords data' })
  @Get()
  async getAll(@Query() query: QueryServiceRecordDto, @CurrentUser() user: JwtPayload) {
    return this.service.getMany(query, user.userId);
  }

  @ApiOperation({ summary: 'Get servicerecord by id' })
  @ApiResponse({ status: 200, description: 'Returns servicerecord data' })
  @ApiResponse({ status: 404, description: 'No such servicerecord' })
  @Get(':id')
  async getById(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.service.getById(id, user.userId);
  }

  @ApiOperation({ summary: 'Update servicerecord' })
  @ApiResponse({ status: 200, description: 'Updated successfuly' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 404, description: 'No such servicerecord' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateServiceRecordDto, @CurrentUser() user: JwtPayload) {
    return this.service.update(id, dto, user.userId);
  }

  @ApiOperation({ summary: 'Delete servicerecord' })
  @ApiResponse({ status: 200, description: 'Deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such servicerecord' })
  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.service.delete(id, user.userId);
  }
}
