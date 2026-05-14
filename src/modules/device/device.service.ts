import { Injectable } from '@nestjs/common';
import { DeviceRepository } from './device.repository';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { QueryDeviceDto } from './dto/query-device.dto';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class DeviceService {
  constructor(private readonly repo: DeviceRepository) {}

  async create(dto: CreateDeviceDto) {
    return this.repo.create({
      ...dto,
    });
  }

  async getMany(query: QueryDeviceDto, userId: string) {
    const where: Prisma.DeviceWhereInput = {
      ...(query.search && {
        OR: [{ imei: { contains: query.search } }],
      }),
      vehicle: { userId },
    };

    const skip = (query.page - 1) * query.limit;

    const orderBy: Prisma.DeviceOrderByWithRelationInput = {
      ...(query.sortBy
        ? { [query.sortBy]: query.sortOrder }
        : { createdAt: 'desc' }),
    };

    const [items, total] = await Promise.all([
      this.repo.getMany(where, orderBy, skip, query.limit),
      this.repo.count(where),
    ]);

    return {
      items,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }

  async getById(id: string, userId: string) {
    return this.repo.getById(id, userId);
  }

  async update(id: string, data: UpdateDeviceDto, userId: string) {
    return this.repo.update(id, data, userId);
  }

  async delete(id: string, userId: string) {
    return this.repo.delete(id, userId);
  }
}
