import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class VehicleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.VehicleCreateInput) {
    return this.prisma.vehicle.create({ data });
  }

  async getMany(where: Prisma.VehicleWhereInput, orderBy: Prisma.VehicleOrderByWithAggregationInput, skip: number, take: number) {
    return this.prisma.vehicle.findMany({
      where,
      skip,
      take,
      orderBy,
      include: { devices: true }
    });
  }

  async count(where?: Prisma.VehicleWhereInput) {
    return this.prisma.vehicle.count({ where });
  }

  async getById(id: string, userId: string) {
    return this.prisma.vehicle.findUniqueOrThrow({
      where: { id },
      include: { devices: true }
    });
  }

  async update(id: string, data: Prisma.VehicleUpdateInput, userId: string) {
    return this.prisma.vehicle.update({ where: { id }, data });
  }

  async delete(id: string, userId: string) {
    return this.prisma.vehicle.delete({ where: { id } });
  }
}
