import { Injectable, NotFoundException } from '@nestjs/common';
import { TelemetryRepository } from './telemetry.repository';
import { CreateTelemetryDto, CreateTelemetryManyDto } from './dto/create-telemetry.dto';
import { UpdateTelemetryDto } from './dto/update-telemetry.dto';
import { QueryTelemetryDto } from './dto/query-telemetry.dto';
import { Prisma } from '@/generated/prisma/client';
import { TelemetryMapper } from './mappers/telemetry.mapper';
import { PaginatedMapper } from '@/common/mappers/paginated.mapper';
import { DeleteManyDto } from './dto/delete-many-telemetry.dto';
import { DeviceService } from '../device/device.service';

@Injectable()
export class TelemetryService {
  constructor(
    private readonly repo: TelemetryRepository,
    private readonly mapper: TelemetryMapper,
    private readonly deviceService: DeviceService,
  ) {}

  async create(dto: CreateTelemetryDto, deviceId: string) {
    const res = await this.repo.create({
      ...dto,
      deviceId,
    });
    return this.mapper.toBaseResponse(res);
  }

  async createMany(dto: CreateTelemetryManyDto, deviceId: string) {
    const res = await this.repo.createMany(dto.items.map((item) => ({...item, deviceId})));
    return res;
  }

  async getMany(query: QueryTelemetryDto, userId: string) {
    const device = await this.deviceService.getById(query.deviceId, userId)
    if (device.vehicle?.userId !== userId) throw new NotFoundException("No such aviable device")

    const where: Prisma.TelemetryWhereInput = {
      deviceId: query.deviceId,
      timestamp: {
        gte: query.gte,
        lte: query.lte,
        lt: query.lastTimestamp,
      },
    };

    const orderBy: Prisma.TelemetryOrderByWithRelationInput = {
      timestamp: 'asc',
    };

    const [items, total] = await Promise.all([this.repo.getMany(where, orderBy, query.limit), this.repo.count(where)]);

    return PaginatedMapper.map(
      {
        items,
        meta: {
          total,
          page: 1,
          limit: query.limit,
          totalPages: Math.ceil(total / query.limit),
        },
      },
      (item) => this.mapper.toBaseResponse(item),
    );
  }

  async getUnique(deviceId: string, timestamp: string, userId: string) {
    const device = await this.deviceService.getById(deviceId, userId)
    if (device.vehicle?.userId !== userId) throw new NotFoundException("No such aviable device")

    const res = await this.repo.getUnique(deviceId, timestamp);
    return this.mapper.toBaseResponse(res);
  }

  async update(deviceId: string, timestamp: string, data: UpdateTelemetryDto, userId: string) {
    const device = await this.deviceService.getById(deviceId, userId)
    if (device.vehicle?.userId !== userId) throw new NotFoundException("No such aviable device")

    const res = await this.repo.update(deviceId, timestamp, data);
    return this.mapper.toBaseResponse(res);
  }

  async delete(deviceId: string, timestamp: string, userId: string) {
    const device = await this.deviceService.getById(deviceId, userId)
    if (device.vehicle?.userId !== userId) throw new NotFoundException("No such aviable device")

    const res = await this.repo.delete(deviceId, timestamp);
    return this.mapper.toBaseResponse(res);
  }

  async deleteMany(query: DeleteManyDto, userId: string) {
    const device = await this.deviceService.getById(query.deviceId, userId)
    if (device.vehicle?.userId !== userId) throw new NotFoundException("No such aviable device")
  
    return this.repo.deleteMany(query.deviceId, query.gte, query.lte)
  }
}
