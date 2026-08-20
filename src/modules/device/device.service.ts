import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { DeviceRepository } from './device.repository';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { QueryDeviceDto } from './dto/query-device.dto';
import { DeviceStatus, Prisma } from '@/generated/prisma/client';
import { DeviceMapper } from './mappers/device.mapper';
import { PaginatedMapper } from '@/common/mappers/paginated.mapper';
import { JwtService } from '@nestjs/jwt';
import { AuthDeviceDto } from './dto/auth-device.dto';

@Injectable()
export class DeviceService {
  constructor(
    private readonly repo: DeviceRepository,
    private readonly mapper: DeviceMapper,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateDeviceDto) {
    const { secret, ...data } = dto
    const secretHash = await bcrypt.hash(secret, 10)
    
    const res = await this.repo.create({
      ...data,
      secretHash,
    });
    return this.mapper.toBaseResponse(res);
  }

  async auth(dto: AuthDeviceDto) {
    const device = await this.repo.getById(dto.deviceId);
    if (!device) throw new UnauthorizedException("User not found");

    const valid = await bcrypt.compare(dto.secret, device.secretHash);
    if (!valid) throw new UnauthorizedException("Invalid credentials");

    const token = await this.getToken(device.id);

    return { accessToken: token };
  }

  async getMany(query: QueryDeviceDto) {
    const where: Prisma.DeviceWhereInput = {
      ...(query.search && {
        OR: [{ imei: { contains: query.search } }],
      }),
    };

    const skip = (query.page - 1) * query.limit;

    const orderBy: Prisma.DeviceOrderByWithRelationInput = {
      ...(query.sortBy ? { [query.sortBy]: query.sortOrder } : { createdAt: 'desc' }),
    };

    const [items, total] = await Promise.all([
      this.repo.getMany(where, orderBy, skip, query.limit),
      this.repo.count(where),
    ]);

    return PaginatedMapper.map(
      {
        items,
        meta: {
          total,
          page: query.page,
          limit: query.limit,
          totalPages: Math.ceil(total / query.limit),
        },
      },
      (item) => this.mapper.toListItem(item),
    );
  }

  async getById(id: string) {
    const res = await this.repo.getById(id);
    return this.mapper.toDetails(res);
  }

  async update(id: string, data: UpdateDeviceDto) {
    const res = await this.repo.update(id, data);
    return this.mapper.toBaseResponse(res);
  }

  async connectVehicle(vehicleId: string, dto: AuthDeviceDto, userId: string) {
    const device = await this.repo.getById(dto.deviceId);
    if (!device) throw new UnauthorizedException("User not found");

    if (device.status !== DeviceStatus.AVAILABLE) throw new ForbiddenException("Device is not available")

    const valid = await bcrypt.compare(dto.secret, device.secretHash);
    if (!valid) throw new UnauthorizedException("Invalid credentials");

    const res = await this.repo.update(dto.deviceId, { vehicle: { connect: { id: vehicleId } } });
    return this.mapper.toBaseResponse(res);
  }

  async delete(id: string) {
    const res = await this.repo.delete(id);
    return this.mapper.toBaseResponse(res);
  }

  private async getToken(deviceId: string) {
    const payload = {
      sub: deviceId,
      jti: crypto.randomUUID(),
    }
    const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: "60m",
        secret: process.env.JWT_SECRET || 'super-secret',
    });
    return accessToken
  }
}
