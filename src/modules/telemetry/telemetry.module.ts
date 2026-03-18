import { Module } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { TelemetryController } from './telemetry.controller';
import { TelemetryRepository } from './telemetry.repository';

@Module({
  providers: [TelemetryService, TelemetryRepository],
  controllers: [TelemetryController]
})
export class TelemetryModule {}
