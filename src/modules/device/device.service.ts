import { Injectable } from '@nestjs/common';
import { DeviceRepository } from './device.repository';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { QueryDeviceDto } from './dto/query-device.dto';
import { Prisma } from '@/generated/prisma/client';
import { DeviceMapper } from './mappers/device.mapper';
import { PaginatedMapper } from '@/common/mappers/paginated.mapper';

@Injectable()
export class DeviceService {
  constructor(
    private readonly repo: DeviceRepository,
    private readonly mapper: DeviceMapper,
  ) {}

  async create(dto: CreateDeviceDto) {
    const res = await this.repo.create({
      ...dto,
    });
    return this.mapper.toBaseResponse(res);
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

  async getById(id: string, userId: string) {
    const res = await this.repo.getById(id, userId);
    return this.mapper.toDetails(res);
  }

  async update(id: string, data: UpdateDeviceDto, userId: string) {
    const res = await this.repo.update(id, data, userId);
    return this.mapper.toBaseResponse(res);
  }

  async delete(id: string, userId: string) {
    const res = await this.repo.delete(id, userId);
    return this.mapper.toBaseResponse(res);
  }
}
