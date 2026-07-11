import { BadRequestException, Injectable } from '@nestjs/common';
import { TrackRepository } from './track.repository';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { QueryTrackDto } from './dto/query-track.dto';
import { Prisma } from '@/generated/prisma/client';
import { TrackMapper } from './mappers/track.mapper';
import { PaginatedMapper } from '@/common/mappers/paginated.mapper';

@Injectable()
export class TrackService {
  constructor(
    private readonly repo: TrackRepository,
    private readonly mapper: TrackMapper,
  ) {}

  async create(dto: CreateTrackDto, userId: string) {
    const res = await this.repo.create({
      ...dto,
    });
    return this.mapper.toBaseResponse(res);
  }

  async getMany(query: QueryTrackDto, userId: string) {
    const where: Prisma.TrackWhereInput = {
      ...(query.search && {
        OR: [{ name: { contains: query.search, mode: 'insensitive' } }],
      }),
      device: { vehicle: { userId } },
    };

    const skip = (query.page - 1) * query.limit;

    const orderBy: Prisma.TrackOrderByWithRelationInput = {
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

  async update(id: string, data: UpdateTrackDto, userId: string) {
    const res = await this.repo.update(id, data, userId);
    return this.mapper.toBaseResponse(res);
  }

  async delete(id: string, userId: string) {
    const res = await this.repo.delete(id, userId);
    return this.mapper.toBaseResponse(res);
  }
}
