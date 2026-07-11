import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class ServiceIntervalRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ServiceIntervalUncheckedCreateInput) {
    return this.prisma.serviceInterval.create({ data });
  }

  async getMany(
    where: Prisma.ServiceIntervalWhereInput,
    orderBy: Prisma.ServiceIntervalOrderByWithAggregationInput,
    skip: number,
    take: number,
  ) {
    return this.prisma.serviceInterval.findMany({
      where,
      skip,
      take,
      orderBy,
      include: {},
    });
  }

  async count(where?: Prisma.ServiceIntervalWhereInput) {
    return this.prisma.serviceInterval.count({ where });
  }

  async getById(id: string, userId: string) {
    return this.prisma.serviceInterval.findUniqueOrThrow({
      where: { id, vehicle: { userId } },
      include: {},
    });
  }

  async getByVehicleAndType(
    vehicleId: string,
    serviceTypeId: string,
    userId: string,
  ) {
    return this.prisma.serviceInterval.findUniqueOrThrow({
      where: {
        vehicleId_serviceTypeId: { vehicleId, serviceTypeId },
        vehicle: { userId },
      },
      include: {},
    });
  }

  async update(
    id: string,
    data: Prisma.ServiceIntervalUpdateInput,
    userId: string,
  ) {
    return this.prisma.serviceInterval.update({
      where: { id, vehicle: { userId } },
      data,
    });
  }

  async delete(id: string, userId: string) {
    return this.prisma.serviceInterval.delete({
      where: { id, vehicle: { userId } },
    });
  }
}
