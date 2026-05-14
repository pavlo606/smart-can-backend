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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { QueryTrackDto } from './dto/query-track.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { CurrentUser } from '@/common/decorators/current-user';
import type { JwtPayload } from '@/types/jwt-payload';

@ApiTags('Track')
@Controller('track')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
export class TrackController {
  constructor(private service: TrackService) {}

  @ApiOperation({ summary: 'Create track' })
  @ApiResponse({ status: 201, description: 'Returns created track data' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @Post()
  async create(@Body() dto: CreateTrackDto, @CurrentUser() user: JwtPayload) {
    return this.service.create(dto, user.userId);
  }

  @ApiOperation({ summary: 'Get many tracks with search and pagination' })
  @ApiResponse({ status: 200, description: 'Returns tracks data' })
  @Get()
  async getAll(@Query() query: QueryTrackDto, @CurrentUser() user: JwtPayload) {
    return this.service.getMany(query, user.userId);
  }

  @ApiOperation({ summary: 'Get track by id' })
  @ApiResponse({ status: 200, description: 'Returns track data' })
  @ApiResponse({ status: 404, description: 'No such track' })
  @Get(':id')
  async getById(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.service.getById(id, user.userId);
  }

  @ApiOperation({ summary: 'Update track' })
  @ApiResponse({ status: 200, description: 'Updated successfuly' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 404, description: 'No such track' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTrackDto, @CurrentUser() user: JwtPayload) {
    return this.service.update(id, dto, user.userId);
  }

  @ApiOperation({ summary: 'Delete track' })
  @ApiResponse({ status: 200, description: 'Deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such track' })
  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.service.delete(id, user.userId);
  }
}
