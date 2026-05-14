import { BadRequestException, Injectable } from '@nestjs/common';
import { TrackRepository } from './track.repository';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { QueryTrackDto } from './dto/query-track.dto';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class TrackService {
  constructor(private readonly repo: TrackRepository) {}

  async create(dto: CreateTrackDto, userId: string) {
    return this.repo.create({
      ...dto,
    });
  }

  async getMany(query: QueryTrackDto, userId: string) {
    const where: Prisma.TrackWhereInput = {
      ...(query.search && {
        OR: [{ name: { contains: query.search, mode: 'insensitive' } }],
      }),
      device: { vehicle: { userId } }
    };

    const skip = (query.page - 1) * query.limit;

    const orderBy: Prisma.TrackOrderByWithRelationInput = {
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

  async update(id: string, data: UpdateTrackDto, userId: string) {
    return this.repo.update(id, data, userId);
  }

  async delete(id: string, userId: string) {
    return this.repo.delete(id, userId);
  }
}
