import { VehicleDto } from "@/modules/vehicle/dto/vehicle.dto";
import { DeviceDto } from "./device.dto";

export class DeviceListItemDto extends DeviceDto {
  vehicle!: VehicleDto;
}