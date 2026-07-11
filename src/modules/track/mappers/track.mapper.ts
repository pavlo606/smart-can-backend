import { BaseMapper } from "@/common/mappers/base.mapper";
import { Track } from "@/generated/prisma/client";
import { Injectable } from "@nestjs/common";
import { TrackDto } from "../dto/track.dto";
import { TrackListEntity } from "../prisma/track-list.query";
import { TrackListItemDto } from "../dto/track-list-item.dto";
import { TrackDetailsEntity } from "../prisma/track-details.query";
import { TrackDetailsDto } from "../dto/track-details.dto";

@Injectable()
export class TrackMapper extends BaseMapper<Track, TrackDto> {
  // constructor(private readonly deviceMapper: DeviceMappe) {
  //   super()
  // }

  toBaseResponse(entity: Track): TrackDto {
    return {
      id: entity.id,
      deviceId: entity.deviceId,
      name: entity.name,
      startTimestamp: entity.startTimestamp.toISOString(),
      endTimestamp: entity.endTimestamp.toISOString(),
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    }
  }

  toListItem(entity: TrackListEntity): TrackListItemDto {
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
    }
  }

  toDetails(entity: TrackDetailsEntity): TrackDetailsDto {
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
    }
  }
}