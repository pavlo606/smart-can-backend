import { Injectable } from '@nestjs/common';
import { ServiceRecordRepository } from './service-record.repository';
import { CreateServiceRecordDto } from './dto/create-service-record.dto';
import { QueryServiceRecordDto } from './dto/query-service-record.dto';
import { Prisma } from '@/generated/prisma/client';
import { UpdateServiceRecordDto } from './dto/update-service-record.dto';

@Injectable()
export class ServiceRecordService {
  constructor(private readonly repo: ServiceRecordRepository) {}

  async create(dto: CreateServiceRecordDto, userId: string) {
    return this.repo.create({
      ...dto,
    });
  }

  async getMany(query: QueryServiceRecordDto, userId: string) {
    const where: Prisma.ServiceRecordWhereInput = {
      vehicle: {
        userId
      },
    };

    const skip = (query.page - 1) * query.limit;

    const orderBy: Prisma.ServiceRecordOrderByWithRelationInput = {
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

  async update(id: string, data: UpdateServiceRecordDto, userId: string) {
    return this.repo.update(id, data, userId);
  }

  async delete(id: string, userId: string) {
    return this.repo.delete(id, userId);
  }
}
