import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { DeviceModule } from './modules/device/device.module';
import { TelemetryModule } from './modules/telemetry/telemetry.module';
import { TrackModule } from './modules/track/track.module';
import { ServiceTypeModule } from './modules/service-type/service-type.module';
import { ServiceRecordModule } from './modules/service-record/service-record.module';
import { ServiceIntervalModule } from './modules/service-interval/service-interval.module';
import { VehicleStateModule } from './modules/vehicle-state/vehicle-state.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PrismaModule,
    AuthModule,
    UserModule,
    VehicleModule,
    DeviceModule,
    TelemetryModule,
    TrackModule,
    ServiceTypeModule,
    ServiceRecordModule,
    ServiceIntervalModule,
    VehicleStateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
