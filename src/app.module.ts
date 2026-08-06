import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { LoggerModule } from 'nestjs-pino';
import { randomUUID } from 'crypto';
import { RequestLogger } from './common/middlware/request-logger.middleware';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: false,
        serializers: {
          req: () => undefined,
          res: () => undefined,
        },
        genReqId: (req) => {
          return req.headers['x-request-id']?.toString() ?? randomUUID();
        },
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',

        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  singleLine: true,
                },
              }
            : undefined,
        redact: {
          paths: [
            'req.headers.cookie',
            'req.body.password',
            'body.password',
            'cookies.refreshToken',
            'cookies.accessToken',
          ],
          censor: '***',
        },
      },
    }),
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLogger).forRoutes('*');
  }
}
