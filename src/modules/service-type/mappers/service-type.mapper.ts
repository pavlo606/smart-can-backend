import { BaseMapper } from "@/common/mappers/base.mapper";
import { ServiceType } from "@/generated/prisma/client";
import { Injectable } from "@nestjs/common";
import { ServiceTypeDto } from "../dto/service-type.dto";

@Injectable()
export class ServiceTypeMapper extends BaseMapper<ServiceType, ServiceTypeDto> {
  toBaseResponse(entity: ServiceType): ServiceTypeDto {
    return {
      id: entity.id,
      userId: entity.userId,
      name: entity.name,
      description: entity.description,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    }
  }
}