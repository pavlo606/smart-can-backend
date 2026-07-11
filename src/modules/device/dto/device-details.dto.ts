import { VehicleDto } from "@/modules/vehicle/dto/vehicle.dto";
import { DeviceDto } from "./device.dto";
import { TrackDto } from "@/modules/track/dto/track.dto";

export class DeviceDetailsDto extends DeviceDto {
  vehicle!: VehicleDto;
  tracks!: TrackDto[];
}