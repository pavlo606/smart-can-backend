import { BadRequestException, Injectable } from '@nestjs/common';
import { VehicleRepository } from './vehicle.repository';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { QueryVehicleDto } from './dto/query-vehicle.dto';
import { Prisma } from '@/generated/prisma/client';
import { VehicleMapper } from './mappers/vehicle.mapper';
import { PaginatedMapper } from '@/common/mappers/paginated.mapper';

@Injectable()
export class VehicleService {
  constructor(
    private readonly repo: VehicleRepository,
    private readonly mapper: VehicleMapper,
  ) {}

  async create(dto: CreateVehicleDto, userId: string) {
    const res = await this.repo.create({
      ...dto,
      user: {
        connect: {
          id: userId,
        },
      },
    });
    return this.mapper.toBaseResponse(res);
  }

  async getMany(query: QueryVehicleDto, userId: string) {
    const where: Prisma.VehicleWhereInput = {
      userId,
      ...(query.search && {
        OR: [{ name: { contains: query.search, mode: 'insensitive' } }],
      }),
    };

    const skip = (query.page - 1) * query.limit;

    const orderBy: Prisma.VehicleOrderByWithRelationInput = {
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

  async update(id: string, data: UpdateVehicleDto, userId: string) {
    const res = await this.repo.update(id, data, userId);
    return this.mapper.toBaseResponse(res);
  }

  async delete(id: string, userId: string) {
    const res = await this.repo.delete(id, userId);
    return this.mapper.toBaseResponse(res);
  }
}
