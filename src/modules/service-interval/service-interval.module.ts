import { Module } from '@nestjs/common';
import { ServiceIntervalController } from './service-interval.controller';
import { ServiceIntervalService } from './service-interval.service';
import { ServiceIntervalRepository } from './service-interval.repository';

@Module({
  controllers: [ServiceIntervalController],
  providers: [ServiceIntervalService, ServiceIntervalRepository]
})
export class ServiceIntervalModule {}
