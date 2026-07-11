import { Module } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { TelemetryController } from './telemetry.controller';
import { TelemetryRepository } from './telemetry.repository';
import { TelemetryMapper } from './mappers/telemetry.mapper';

@Module({
  providers: [TelemetryService, TelemetryRepository, TelemetryMapper],
  controllers: [TelemetryController]
})
export class TelemetryModule {}
