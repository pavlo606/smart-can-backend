import { Injectable } from '@nestjs/common';
import { TelemetryRepository } from './telemetry.repository';
import { CreateTelemetryDto } from './dto/create-telemetry.dto';
import { UpdateTelemetryDto } from './dto/update-telemetry.dto';
import { QueryTelemetryDto } from './dto/query-telemetry.dto';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class TelemetryService {
  constructor(private readonly repo: TelemetryRepository) {}

  async create(dto: CreateTelemetryDto) {
    return this.repo.create({
      ...dto,
    });
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

    const [items, total] = await Promise.all([
      this.repo.getMany(where, orderBy, query.limit),
      this.repo.count(where),
    ]);

    return {
      items,
      meta: {
        total,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }

  async getUnique(deviceId: string, timestamp: string) {
    return this.repo.getUnique(deviceId, timestamp);
  }

  async update(deviceId: string, timestamp: string, data: UpdateTelemetryDto) {
    return this.repo.update(deviceId, timestamp, data);
  }

  async delete(deviceId: string, timestamp: string) {
    return this.repo.delete(deviceId, timestamp);
  }
}
