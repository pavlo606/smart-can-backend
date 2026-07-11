import { BaseMapper } from '@/common/mappers/base.mapper';
import { Device } from '@/generated/prisma/client';
import { Injectable } from '@nestjs/common';
import { DeviceDto } from '../dto/device.dto';
import { DeviceListEntity } from '../prisma/device-list.query';
import { DeviceListItemDto } from '../dto/device-lsit-item.dto';
import { DeviceDetailsEntity } from '../prisma/device-details.query';
import { DeviceDetailsDto } from '../dto/device-details.dto';

@Injectable()
export class DeviceMapper extends BaseMapper<Device, DeviceDto> {
  toBaseResponse(entity: Device): DeviceDto {
    return {
      id: entity.id,
      imei: entity.imei,
      vehicleId: entity.vehicleId,
      firmwareVersion: entity.firmwareVersion,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }

  toListItem(entity: DeviceListEntity): DeviceListItemDto {
    return {
      ...this.toBaseResponse(entity),

      vehicle: {
        id: entity.vehicle.id,
        name: entity.vehicle.name,
        userId: entity.vehicle.userId,
        brand: entity.vehicle.brand,
        model: entity.vehicle.model,
        year: entity.vehicle.year,
        vin: entity.vehicle.vin,
        initialOdometer: entity.vehicle.initialOdometer,
        trackerDistance: entity.vehicle.trackerDistance,
        createdAt: entity.vehicle.createdAt.toISOString(),
        updatedAt: entity.vehicle.updatedAt.toISOString(),
      },
    };
  }

  toDetails(entity: DeviceDetailsEntity): DeviceDetailsDto {
    return {
      ...this.toBaseResponse(entity),

      vehicle: {
        id: entity.vehicle.id,
        name: entity.vehicle.name,
        userId: entity.vehicle.userId,
        brand: entity.vehicle.brand,
        model: entity.vehicle.model,
        year: entity.vehicle.year,
        vin: entity.vehicle.vin,
        initialOdometer: entity.vehicle.initialOdometer,
        trackerDistance: entity.vehicle.trackerDistance,
        createdAt: entity.vehicle.createdAt.toISOString(),
        updatedAt: entity.vehicle.updatedAt.toISOString(),
      },

      tracks: entity.tracks.map((track) => ({
        id: track.id,
        deviceId: track.deviceId,
        name: track.name,
        startTimestamp: track.startTimestamp.toISOString(),
        endTimestamp: track.endTimestamp.toISOString(),
        createdAt: track.createdAt.toISOString(),
        updatedAt: track.updatedAt.toISOString(),
      })),
    };
  }
}
