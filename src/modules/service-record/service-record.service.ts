import { Injectable } from '@nestjs/common';
import { ServiceRecordRepository } from './service-record.repository';
import { CreateServiceRecordDto } from './dto/create-service-record.dto';
import { QueryServiceRecordDto } from './dto/query-service-record.dto';
import { Prisma } from '@/generated/prisma/client';
import { UpdateServiceRecordDto } from './dto/update-service-record.dto';
import { ServiceRecordMapper } from './mappers/service-record.mapper';
import { PaginatedMapper } from '@/common/mappers/paginated.mapper';

@Injectable()
export class ServiceRecordService {
  constructor(
    private readonly repo: ServiceRecordRepository,
    private readonly mapper: ServiceRecordMapper,
  ) {}

  async create(dto: CreateServiceRecordDto, userId: string) {
    const res = await this.repo.create({
      ...dto,
    });
    return this.mapper.toBaseResponse(res);
  }

  async getMany(query: QueryServiceRecordDto, userId: string) {
    const where: Prisma.ServiceRecordWhereInput = {
      vehicle: {
        userId,
      },
    };

    const skip = (query.page - 1) * query.limit;

    const orderBy: Prisma.ServiceRecordOrderByWithRelationInput = {
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
      (item) => this.mapper.toBaseResponse(item),
    );
  }

  async getById(id: string, userId: string) {
    const res = await this.repo.getById(id, userId);
    return this.mapper.toBaseResponse(res);
  }

  async update(id: string, data: UpdateServiceRecordDto, userId: string) {
    const res = await this.repo.update(id, data, userId);
    return this.mapper.toBaseResponse(res);
  }

  async delete(id: string, userId: string) {
    const res = await this.repo.delete(id, userId);
    return this.mapper.toBaseResponse(res);
  }
}
