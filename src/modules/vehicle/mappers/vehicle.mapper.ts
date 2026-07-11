import { Injectable } from '@nestjs/common';
import { VehicleListItemDto } from '../dto/vehicle-list-item.dto';
import { VehicleListEntity } from '../prisma/vehicle-list.query';
import { VehicleDetailsEntity } from '../prisma/vehicle-details.query';
import { VehicleDetailsDto } from '../dto/vehicle-details.dto';
import { Vehicle } from '@/generated/prisma/client';
import { VehicleDto } from '../dto/vehicle.dto';
import { BaseMapper } from '@/common/mappers/base.mapper';
import { VehicleStateMapper } from '@/modules/vehicle-state/mappers/vehicle-state.mapper';

@Injectable()
export class VehicleMapper extends BaseMapper<Vehicle, VehicleDto> {
  constructor(private readonly vehicleStateMapper: VehicleStateMapper) {
    super()
  }

  toBaseResponse(entity: Vehicle): VehicleDto {
    return {
      id: entity.id,
      name: entity.name,
      userId: entity.userId,
      brand: entity.brand,
      model: entity.model,
      year: entity.year,
      vin: entity.vin,
      initialOdometer: entity.initialOdometer,
      trackerDistance: entity.trackerDistance,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    }
  }

  toListItem(entity: VehicleListEntity): VehicleListItemDto {
    return {
      ...this.toBaseResponse(entity),

      device: entity.device && {
        id: entity.device.id,
        imei: entity.device.imei,
        firmwareVersion: entity.device.firmwareVersion,
        vehicleId: entity.device.vehicleId,
        createdAt: entity.createdAt.toISOString(),
        updatedAt: entity.updatedAt.toISOString(),
      },

      vehicleState: entity.vehicleState && this.vehicleStateMapper.toBaseResponse(entity.vehicleState)
    };
  }

  toDetails(entity: VehicleDetailsEntity): VehicleDetailsDto {
    return {
      ...this.toBaseResponse(entity),

      device: entity.device && {
        id: entity.device.id,
        imei: entity.device.imei,
        firmwareVersion: entity.device.firmwareVersion,
        vehicleId: entity.device.vehicleId,
        createdAt: entity.createdAt.toISOString(),
        updatedAt: entity.updatedAt.toISOString(),
      },

      vehicleState: entity.vehicleState && this.vehicleStateMapper.toBaseResponse(entity.vehicleState)
    };
  }
}
