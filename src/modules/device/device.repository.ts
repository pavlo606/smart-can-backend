import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class DeviceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.DeviceUncheckedCreateInput) {
    return this.prisma.device.create({ data });
  }

  async getMany(where: Prisma.DeviceWhereInput, orderBy: Prisma.DeviceOrderByWithAggregationInput, skip: number, take: number) {
    return this.prisma.device.findMany({
      where,
      skip,
      take,
      orderBy,
    });
  }

  async count(where?: Prisma.DeviceWhereInput) {
    return this.prisma.device.count({ where });
  }

  async getById(id: string) {
    return this.prisma.device.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.DeviceUpdateInput) {
    return this.prisma.device.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.device.delete({ where: { id } });
  }
}
