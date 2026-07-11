import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { DeviceRepository } from './device.repository';
import { DeviceMapper } from './mappers/device.mapper';

@Module({
  controllers: [DeviceController],
  providers: [DeviceService, DeviceRepository, DeviceMapper]
})
export class DeviceModule {}
