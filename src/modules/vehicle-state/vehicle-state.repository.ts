import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class VehicleStateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.VehicleStateUncheckedCreateInput) {
    return this.prisma.vehicleState.create({ data });
  }

  async getById(vehicleId: string, userId: string) {
    return this.prisma.vehicleState.findUnique({
      where: { vehicleId, vehicle: { userId } },
      include: { vehicle: true },
    });
  }

  async update(
    vehicleId: string,
    data: Prisma.VehicleStateUpdateInput,
    userId: string,
  ) {
    return this.prisma.vehicleState.update({
      where: { vehicleId, vehicle: { userId } },
      data,
    });
  }

  async delete(vehicleId: string, userId: string) {
    return this.prisma.vehicleState.delete({ where: { vehicleId, vehicle: { userId } } });
  }
}
