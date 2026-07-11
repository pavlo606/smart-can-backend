import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';
import { deviceListInclude } from './prisma/device-list.query';
import { deviceDetailsInclude } from './prisma/device-details.query';

@Injectable()
export class DeviceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.DeviceUncheckedCreateInput) {
    return this.prisma.device.create({ data });
  }

  async getMany(
    where: Prisma.DeviceWhereInput,
    orderBy: Prisma.DeviceOrderByWithAggregationInput,
    skip: number,
    take: number,
  ) {
    return this.prisma.device.findMany({
      where,
      skip,
      take,
      orderBy,
      ...deviceListInclude
    });
  }

  async count(where?: Prisma.DeviceWhereInput) {
    return this.prisma.device.count({ where });
  }

  async getById(id: string, userId: string) {
    return this.prisma.device.findUniqueOrThrow({
      where: { id, vehicle: { userId } },
      ...deviceDetailsInclude
    });
  }

  async update(id: string, data: Prisma.DeviceUpdateInput, userId: string) {
    return this.prisma.device.update({
      where: { id, vehicle: { userId } },
      data,
    });
  }

  async delete(id: string, userId: string) {
    return this.prisma.device.delete({ where: { id, vehicle: { userId } } });
  }
}
