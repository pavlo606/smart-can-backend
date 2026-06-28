import { Module } from '@nestjs/common';
import { VehicleStateService } from './vehicle-state.service';
import { VehicleStateController } from './vehicle-state.controller';

@Module({
  providers: [VehicleStateService],
  controllers: [VehicleStateController]
})
export class VehicleStateModule {}
