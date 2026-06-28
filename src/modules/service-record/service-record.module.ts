import { Module } from '@nestjs/common';
import { ServiceRecordService } from './service-record.service';
import { ServiceRecordController } from './service-record.controller';
import { ServiceRecordRepository } from './service-record.repository';

@Module({
  providers: [ServiceRecordService, ServiceRecordRepository],
  controllers: [ServiceRecordController]
})
export class ServiceRecordModule {}
