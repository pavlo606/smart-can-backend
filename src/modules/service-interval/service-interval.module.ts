import { Module } from '@nestjs/common';
import { ServiceIntervalController } from './service-interval.controller';
import { ServiceIntervalService } from './service-interval.service';
import { ServiceIntervalRepository } from './service-interval.repository';
import { ServiceIntervalMapper } from './mappers/service-interval.mapper';

@Module({
  controllers: [ServiceIntervalController],
  providers: [ServiceIntervalService, ServiceIntervalRepository, ServiceIntervalMapper]
})
export class ServiceIntervalModule {}
