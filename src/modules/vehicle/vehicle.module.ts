import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { VehicleRepository } from './vehicle.repository';
import { VehicleMapper } from './mappers/vehicle.mapper';
import { VehicleStateMapper } from '../vehicle-state/mappers/vehicle-state.mapper';

@Module({
  providers: [VehicleService, VehicleRepository, VehicleMapper, VehicleStateMapper],
  controllers: [VehicleController]
})
export class VehicleModule {}
