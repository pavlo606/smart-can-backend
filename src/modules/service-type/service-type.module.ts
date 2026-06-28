import { Module } from '@nestjs/common';
import { ServiceTypeService } from './service-type.service';
import { ServiceTypeController } from './service-type.controller';
import { ServiceTypeRepository } from './service-type.repository'

@Module({
  providers: [ServiceTypeService, ServiceTypeRepository],
  controllers: [ServiceTypeController]
})
export class ServiceTypeModule {}
