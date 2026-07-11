import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TrackRepository } from './track.repository';
import { TrackMapper } from './mappers/track.mapper';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackRepository, TrackMapper]
})
export class TrackModule {}
