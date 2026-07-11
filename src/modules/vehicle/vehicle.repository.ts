import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';
import { vehicleListInclude } from './prisma/vehicle-list.query';
import { vehicleDetailsInclude } from './prisma/vehicle-details.query';

@Injectable()
export class VehicleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.VehicleCreateInput) {
    return this.prisma.vehicle.create({ data });
  }

  async getMany(
    where: Prisma.VehicleWhereInput,
    orderBy: Prisma.VehicleOrderByWithAggregationInput,
    skip: number,
    take: number,
  ) {
    return this.prisma.vehicle.findMany({
      where,
      skip,
      take,
      orderBy,
      ...vehicleListInclude,
    });
  }

  async count(where?: Prisma.VehicleWhereInput) {
    return this.prisma.vehicle.count({ where });
  }

  async getById(id: string, userId: string) {
    return this.prisma.vehicle.findUniqueOrThrow({
      where: { id, userId },
      ...vehicleDetailsInclude,
    });
  }

  async update(id: string, data: Prisma.VehicleUpdateInput, userId: string) {
    return this.prisma.vehicle.update({ where: { id, userId }, data });
  }

  async delete(id: string, userId: string) {
    return this.prisma.vehicle.delete({ where: { id, userId } });
  }
}
