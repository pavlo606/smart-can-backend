import { BadRequestException, Injectable } from '@nestjs/common';
import { VehicleRepository } from './vehicle.repository';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { QueryVehicleDto } from './dto/query-vehicle.dto';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class VehicleService {
  constructor(private readonly repo: VehicleRepository) {}

  async create(dto: CreateVehicleDto, userId: string) {
    return this.repo.create({
      ...dto,
      user: {
        connect: {
          id: userId,
        },
      },
    });
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

  async update(id: string, data: UpdateVehicleDto, userId: string) {
    return this.repo.update(id, data, userId);
  }

  async delete(id: string, userId: string) {
    try {
      return await this.repo.delete(id, userId);
    } catch (err) {
      if (err.cause && err.cause.code === '23001') {
        throw new BadRequestException(
          'Failed to delete due to dependences on other tables',
        );
      }
      throw err;
    }
  }
}
