import { Module } from '@nestjs/common';
import { VehicleStateService } from './vehicle-state.service';
import { VehicleStateController } from './vehicle-state.controller';
import { VehicleStateRepository } from './vehicle-state.repository';
import { VehicleStateMapper } from './mappers/vehicle-state.mapper';
import { VehicleMapper } from '../vehicle/mappers/vehicle.mapper';

@Module({
  providers: [VehicleStateService, VehicleStateRepository, VehicleStateMapper],
  controllers: [VehicleStateController]
})
export class VehicleStateModule {}
