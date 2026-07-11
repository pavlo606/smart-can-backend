import { BaseMapper } from "@/common/mappers/base.mapper";
import { ServiceRecord } from "@/generated/prisma/client";
import { Injectable } from "@nestjs/common";
import { ServiceRecordDto } from "../dto/service-record.dto";

@Injectable()
export class ServiceRecordMapper extends BaseMapper<ServiceRecord, ServiceRecordDto> {
  toBaseResponse(entity: ServiceRecord): ServiceRecordDto {
    return {
      id: entity.id,
      vehicleId: entity.vehicleId,
      serviceTypeId: entity.serviceTypeId,
      performedAt: entity.performedAt.toISOString(),
      performedOdometer: entity.performedOdometer,
      comment: entity.comment,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    }
  }
}