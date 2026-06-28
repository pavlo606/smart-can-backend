import { Injectable } from '@nestjs/common';
import { ServiceIntervalRepository } from './service-interval.repository';
import { CreateServiceIntervalDto } from './dto/create-service-interval.dto';
import { QueryServiceIntervalDto } from './dto/query-service-interval.dto';
import { Prisma } from '@/generated/prisma/client';
import { UpdateServiceIntervalDto } from './dto/update-service-interval.dto';
import { QueryUniqueServiceIntervalDto } from './dto/query-unique-service-interval.dto';

@Injectable()
export class ServiceIntervalService {
  constructor(private readonly repo: ServiceIntervalRepository) {}

  async create(dto: CreateServiceIntervalDto, userId: string) {
    return this.repo.create({
      ...dto,
    });
  }

  async getMany(query: QueryServiceIntervalDto, userId: string) {
    const where: Prisma.ServiceIntervalWhereInput = {
      vehicle: {
        userId
      },
    };

    const skip = (query.page - 1) * query.limit;

    const orderBy: Prisma.ServiceIntervalOrderByWithRelationInput = {
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

  async getByVehicleAndType(query: QueryUniqueServiceIntervalDto, userId: string) {
    return this.repo.getByVehicleAndType(query.vehicleId, query.serviceTypeId, userId);
  }

  async update(id: string, data: UpdateServiceIntervalDto, userId: string) {
    return this.repo.update(id, data, userId);
  }

  async delete(id: string, userId: string) {
    return this.repo.delete(id, userId);
  }
}
