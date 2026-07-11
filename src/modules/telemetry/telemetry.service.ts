import { Injectable } from '@nestjs/common';
import { TelemetryRepository } from './telemetry.repository';
import { CreateTelemetryDto } from './dto/create-telemetry.dto';
import { UpdateTelemetryDto } from './dto/update-telemetry.dto';
import { QueryTelemetryDto } from './dto/query-telemetry.dto';
import { Prisma } from '@/generated/prisma/client';
import { TelemetryMapper } from './mappers/telemetry.mapper';
import { PaginatedMapper } from '@/common/mappers/paginated.mapper';

@Injectable()
export class TelemetryService {
  constructor(
    private readonly repo: TelemetryRepository,
    private readonly mapper: TelemetryMapper,
  ) {}

  async create(dto: CreateTelemetryDto) {
    const res = await this.repo.create({
      ...dto,
    });
    return this.mapper.toBaseResponse(res);
  }

  async getMany(query: QueryTelemetryDto) {
    const where: Prisma.TelemetryWhereInput = {
      deviceId: query.deviceId,
      timestamp: {
        gte: query.gte,
        lte: query.lte,
        lt: query.lastTimestamp,
      },
    };

    const orderBy: Prisma.TelemetryOrderByWithRelationInput = {
      timestamp: 'desc',
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

  async getUnique(deviceId: string, timestamp: string) {
    const res = await this.repo.getUnique(deviceId, timestamp);
    return this.mapper.toBaseResponse(res);
  }

  async update(deviceId: string, timestamp: string, data: UpdateTelemetryDto) {
    const res = await this.repo.update(deviceId, timestamp, data);
    return this.mapper.toBaseResponse(res);
  }

  async delete(deviceId: string, timestamp: string) {
    const res = await this.repo.delete(deviceId, timestamp);
    return this.mapper.toBaseResponse(res);
  }
}
