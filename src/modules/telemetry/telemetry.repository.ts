import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class TelemetryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.TelemetryUncheckedCreateInput) {
    return this.prisma.telemetry.create({ data });
  }

  async getMany(
    where: Prisma.TelemetryWhereInput,
    orderBy: Prisma.TelemetryOrderByWithAggregationInput,
    take: number,
  ) {
    return this.prisma.telemetry.findMany({
      where,
      take,
      orderBy,
    });
  }

  async count(where?: Prisma.TelemetryWhereInput) {
    return this.prisma.telemetry.count({ where });
  }

  async getUnique(deviceId: string, timestamp: string) {
    return this.prisma.telemetry.findUnique({
      where: {
        deviceId_timestamp: { deviceId, timestamp },
      },
    });
  }

  async update(
    deviceId: string,
    timestamp: string,
    data: Prisma.TelemetryUpdateInput,
  ) {
    return this.prisma.telemetry.update({
      where: {
        deviceId_timestamp: { deviceId, timestamp },
      },
      data,
    });
  }

  async delete(deviceId: string, timestamp: string) {
    return this.prisma.telemetry.delete({
      where: {
        deviceId_timestamp: { deviceId, timestamp },
      },
    });
  }
}
