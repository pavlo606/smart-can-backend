import { PartialType } from "@nestjs/swagger";
import { CreateVehicleStateDto } from "./create-vehicle-state.dto";

export class UpdateVehicleStateDto extends PartialType(CreateVehicleStateDto) {}