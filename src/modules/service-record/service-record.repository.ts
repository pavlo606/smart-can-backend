import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class ServiceRecordRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ServiceRecordUncheckedCreateInput) {
    return this.prisma.serviceRecord.create({ data });
  }

  async getMany(
    where: Prisma.ServiceRecordWhereInput,
    orderBy: Prisma.ServiceRecordOrderByWithAggregationInput,
    skip: number,
    take: number,
  ) {
    return this.prisma.serviceRecord.findMany({
      where,
      skip,
      take,
      orderBy,
      include: {},
    });
  }

  async count(where?: Prisma.ServiceRecordWhereInput) {
    return this.prisma.serviceRecord.count({ where });
  }

  async getById(id: string, userId: string) {
    return this.prisma.serviceRecord.findUniqueOrThrow({
      where: { id, vehicle: { userId } },
      include: {},
    });
  }

  async update(
    id: string,
    data: Prisma.ServiceRecordUpdateInput,
    userId: string,
  ) {
    return this.prisma.serviceRecord.update({
      where: { id, vehicle: { userId } },
      data,
    });
  }

  async delete(id: string, userId: string) {
    return this.prisma.serviceRecord.delete({ where: { id, vehicle: { userId } } });
  }
}
