import { Injectable } from '@nestjs/common';
import { ServiceIntervalRepository } from './service-interval.repository';
import { CreateServiceIntervalDto } from './dto/create-service-interval.dto';
import { QueryServiceIntervalDto } from './dto/query-service-interval.dto';
import { Prisma } from '@/generated/prisma/client';
import { UpdateServiceIntervalDto } from './dto/update-service-interval.dto';
import { QueryUniqueServiceIntervalDto } from './dto/query-unique-service-interval.dto';
import { ServiceIntervalMapper } from './mappers/service-interval.mapper';
import { PaginatedMapper } from '@/common/mappers/paginated.mapper';

@Injectable()
export class ServiceIntervalService {
  constructor(
    private readonly repo: ServiceIntervalRepository,
    private readonly mapper: ServiceIntervalMapper,
  ) {}

  async create(dto: CreateServiceIntervalDto, userId: string) {
    const res = await this.repo.create({
      ...dto,
    });
    return this.mapper.toBaseResponse(res);
  }

  async getMany(query: QueryServiceIntervalDto, userId: string) {
    const where: Prisma.ServiceIntervalWhereInput = {
      vehicle: {
        userId,
      },
    };

    const skip = (query.page - 1) * query.limit;

    const orderBy: Prisma.ServiceIntervalOrderByWithRelationInput = {
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

  async getByVehicleAndType(query: QueryUniqueServiceIntervalDto, userId: string) {
    const res = await this.repo.getByVehicleAndType(query.vehicleId, query.serviceTypeId, userId);
    return this.mapper.toBaseResponse(res);
  }

  async update(id: string, data: UpdateServiceIntervalDto, userId: string) {
    const res = await this.repo.update(id, data, userId);
    return this.mapper.toBaseResponse(res);
  }

  async delete(id: string, userId: string) {
    const res = await this.repo.delete(id, userId);
    return this.mapper.toBaseResponse(res);
  }
}
