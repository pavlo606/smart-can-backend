import { Module } from '@nestjs/common';
import { ServiceTypeService } from './service-type.service';
import { ServiceTypeController } from './service-type.controller';
import { ServiceTypeRepository } from './service-type.repository'
import { ServiceTypeMapper } from './mappers/service-type.mapper';

@Module({
  providers: [ServiceTypeService, ServiceTypeRepository, ServiceTypeMapper],
  controllers: [ServiceTypeController]
})
export class ServiceTypeModule {}
