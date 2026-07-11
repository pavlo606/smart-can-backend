import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';
import { trackListInclude } from './prisma/track-list.query';
import { trackDetailsInclude } from './prisma/track-details.query';

@Injectable()
export class TrackRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.TrackUncheckedCreateInput) {
    return this.prisma.track.create({ data });
  }

  async getMany(where: Prisma.TrackWhereInput, orderBy: Prisma.TrackOrderByWithAggregationInput, skip: number, take: number) {
    return this.prisma.track.findMany({
      where,
      skip,
      take,
      orderBy,
      ...trackListInclude
    });
  }

  async count(where?: Prisma.TrackWhereInput) {
    return this.prisma.track.count({ where });
  }

  async getById(id: string, userId: string) {
    return this.prisma.track.findUniqueOrThrow({
      where: { id },
      ...trackDetailsInclude
    });
  }

  async update(id: string, data: Prisma.TrackUpdateInput, userId: string) {
    return this.prisma.track.update({ where: { id }, data });
  }

  async delete(id: string, userId: string) {
    return this.prisma.track.delete({ where: { id } });
  }
}
