import { BaseMapper } from '@/common/mappers/base.mapper';
import { VehicleState } from '@/generated/prisma/client';
import { Injectable } from '@nestjs/common';
import { VehicleStateDto } from '../dto/vehicle-state.dto';

@Injectable()
export class VehicleStateMapper extends BaseMapper<VehicleState, VehicleStateDto> {
  toBaseResponse(entity: VehicleState): VehicleStateDto {
    return {
      vehicleId: entity.vehicleId,
      lastSeen: entity.lastSeen.toISOString(),
      latitude: entity.latitude,
      longitude: entity.longitude,
      speed: entity.speed,
      rpm: entity.rpm,
      coolantTemp: entity.coolantTemp,
      fuelLevel: entity.fuelLevel,
      currentOdometer: entity.currentOdometer,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }
}
