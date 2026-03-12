import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { VehicleRepository } from './vehicle.repository';

@Module({
  providers: [VehicleService, VehicleRepository],
  controllers: [VehicleController]
})
export class VehicleModule {}
