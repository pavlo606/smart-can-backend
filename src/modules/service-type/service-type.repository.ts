import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class ServiceTypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ServiceTypeUncheckedCreateInput) {
    return this.prisma.serviceType.create({ data });
  }

  async getMany(
    where: Prisma.ServiceTypeWhereInput,
    orderBy: Prisma.ServiceTypeOrderByWithAggregationInput,
    skip: number,
    take: number,
  ) {
    return this.prisma.serviceType.findMany({
      where,
      skip,
      take,
      orderBy,
      include: {},
    });
  }

  async count(where?: Prisma.ServiceTypeWhereInput) {
    return this.prisma.serviceType.count({ where });
  }

  async getById(id: string, userId: string) {
    return this.prisma.serviceType.findUnique({
      where: { id, userId },
      include: {},
    });
  }

  async update(
    id: string,
    data: Prisma.ServiceTypeUpdateInput,
    userId: string,
  ) {
    return this.prisma.serviceType.update({
      where: { id, userId },
      data,
    });
  }

  async delete(id: string, userId: string) {
    return this.prisma.serviceType.delete({ where: { id, userId } });
  }
}
