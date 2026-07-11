import { Injectable } from '@nestjs/common';
import { ServiceTypeRepository } from './service-type.repository';
import { CreateServiceTypeDto } from './dto/create-service-type.dto';
import { QueryServiceTypeDto } from './dto/query-service-type.dto';
import { Prisma } from '@/generated/prisma/client';
import { UpdateServiceTypeDto } from './dto/update-service-type.dto';
import { ServiceTypeMapper } from './mappers/service-type.mapper';
import { PaginatedMapper } from '@/common/mappers/paginated.mapper';

@Injectable()
export class ServiceTypeService {
  constructor(
    private readonly repo: ServiceTypeRepository,
    private readonly mapper: ServiceTypeMapper,
  ) {}

  async create(dto: CreateServiceTypeDto, userId: string) {
    const res = await this.repo.create({
      ...dto,
      userId,
    });
    return this.mapper.toBaseResponse(res);
  }

  async getMany(query: QueryServiceTypeDto, userId: string) {
    const where: Prisma.ServiceTypeWhereInput = {
      ...(query.search && {
        OR: [{ name: { contains: query.search } }],
      }),
      userId,
    };

    const skip = (query.page - 1) * query.limit;

    const orderBy: Prisma.ServiceTypeOrderByWithRelationInput = {
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

  async update(id: string, data: UpdateServiceTypeDto, userId: string) {
    const res = await this.repo.update(id, data, userId);
    return this.mapper.toBaseResponse(res);
  }

  async delete(id: string, userId: string) {
    const res = await this.repo.delete(id, userId);
    return this.mapper.toBaseResponse(res);
  }
}
