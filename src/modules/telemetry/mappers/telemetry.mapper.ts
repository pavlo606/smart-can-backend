import { BaseMapper } from "@/common/mappers/base.mapper";
import { Telemetry } from "@/generated/prisma/client";
import { Injectable } from "@nestjs/common";
import { TelemetryDto } from "../dto/telemetry.dto";

@Injectable()
export class TelemetryMapper extends BaseMapper<Telemetry, TelemetryDto> {
  toBaseResponse(entity: Telemetry): TelemetryDto {
    return {
      deviceId: entity.deviceId,
      timestamp: entity.timestamp.toISOString(),
      latitude: entity.latitude,
      longitude: entity.longitude,
      speed: entity.speed,
      rpm: entity.rpm,
      coolantTemp: entity.coolantTemp,
      fuelLevel: entity.fuelLevel,
      createdAt: entity.createdAt.toISOString(),
    }
  }
}