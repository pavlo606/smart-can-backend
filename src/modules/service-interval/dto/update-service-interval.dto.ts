import { PartialType } from "@nestjs/swagger";
import { CreateServiceIntervalDto } from "./create-service-interval.dto";

export class UpdateServiceIntervalDto extends PartialType(CreateServiceIntervalDto) {}