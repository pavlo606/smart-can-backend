import { DeviceDto } from "@/modules/device/dto/device.dto";
import { TrackDto } from "./track.dto";

export class TrackListItemDto extends TrackDto {
  device!: DeviceDto
}