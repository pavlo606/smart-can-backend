import { Controller, Get, UseGuards, Req, Patch, Body, Query, Post, Delete, Param, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/roles/roles.decorator';
import { Role } from '@/modules/auth/roles/roles.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { QueryUserDto } from './dto/query-user.dto';
import { CurrentUser } from '@/common/decorators/current-user';
import type { JwtPayload } from '@/types/jwt-payload';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  // @Post('')
  // @ApiOperation({ summary: 'Create new user as admin without login' })
  // @ApiResponse({ status: 201, description: 'User created' })
  // @ApiResponse({ status: 400, description: 'Invalid dto' })
  // @ApiResponse({ status: 401, description: 'Invalid credentionals' })
  // @ApiResponse({ status: 403, description: 'You do not have permission' })
  // @ApiResponse({ status: 409, description: 'Email is already in use' })
  // async create(@Body() dto: CreateUserDto) {
  //   return this.userService.create(dto);
  // }


  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get loggined user' })
  @ApiResponse({ status: 200, description: 'Returns user data' })
  @ApiResponse({ status: 401, description: 'Invalid credentionals' })
  async getMe(@CurrentUser() user: JwtPayload) {
    return this.userService.findByIdSafe(user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns all users' })
  @ApiResponse({ status: 401, description: 'Invalid credentionals' })
  @ApiResponse({ status: 403, description: 'Do not have permission' })
  async getAll(@Query() query: QueryUserDto) {
    return this.userService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Change logged in user data' })
  @ApiResponse({ status: 200, description: 'User data changed' })
  @ApiResponse({ status: 401, description: 'Invalid credentionals' })
  async updateCurrentUser(@CurrentUser() user: JwtPayload, @Body() dto: UpdateUserDto) {
    return this.userService.update(user.userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(":id")
  @ApiOperation({ summary: 'Change user data' })
  @ApiResponse({ status: 200, description: 'User data changed' })
  @ApiResponse({ status: 401, description: 'Invalid credentionals' })
  @ApiResponse({ status: 403, description: 'Do not have permission' })
  async updateUser(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(":id")
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User data changed' })
  @ApiResponse({ status: 401, description: 'Invalid credentionals' })
  @ApiResponse({ status: 403, description: 'Do not have permission' })
  async delete(@Param("id") id: string) {
    return this.userService.delete(id);
  }
}
