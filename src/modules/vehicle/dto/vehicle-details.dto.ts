import { VehicleDto } from "./vehicle.dto";
import { DeviceDto } from "@/modules/device/dto/device.dto";
import { VehicleStateDto } from "@/modules/vehicle-state/dto/vehicle-state.dto";

export class VehicleDetailsDto extends VehicleDto {
  device!: DeviceDto | null;
  vehicleState!: VehicleStateDto | null;
}