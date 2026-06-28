import { Injectable } from '@nestjs/common';
import { ServiceTypeRepository } from './service-type.repository';
import { CreateServiceTypeDto } from './dto/create-service-type.dto';
import { QueryServiceTypeDto } from './dto/query-service-type.dto';
import { Prisma } from '@/generated/prisma/client';
import { UpdateServiceTypeDto } from './dto/update-service-type.dto';

@Injectable()
export class ServiceTypeService {
  constructor(private readonly repo: ServiceTypeRepository) {}

  async create(dto: CreateServiceTypeDto, userId: string) {
    return this.repo.create({
      ...dto,
      userId,
    });
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

  async update(id: string, data: UpdateServiceTypeDto, userId: string) {
    return this.repo.update(id, data, userId);
  }

  async delete(id: string, userId: string) {
    return this.repo.delete(id, userId);
  }
}
