import { BaseMapper } from "@/common/mappers/base.mapper";
import { ServiceInterval } from "@/generated/prisma/client";
import { Injectable } from "@nestjs/common";
import { ServiceIntervalDto } from "../dto/service-interval.dto";

@Injectable()
export class ServiceIntervalMapper extends BaseMapper<ServiceInterval, ServiceIntervalDto> {
  toBaseResponse(entity: ServiceInterval): ServiceIntervalDto {
    return {
      id: entity.id,
      vehicleId: entity.vehicleId,
      serviceTypeId: entity.serviceTypeId,
      intervalKm: entity.intervalKm,
      intervalDays: entity.intervalDays,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    }
  }
}