import { Module } from '@nestjs/common';
import { ServiceRecordService } from './service-record.service';
import { ServiceRecordController } from './service-record.controller';
import { ServiceRecordRepository } from './service-record.repository';
import { ServiceRecordMapper } from './mappers/service-record.mapper';

@Module({
  providers: [ServiceRecordService, ServiceRecordRepository, ServiceRecordMapper],
  controllers: [ServiceRecordController]
})
export class ServiceRecordModule {}
