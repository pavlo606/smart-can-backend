import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { DeviceRepository } from './device.repository';
import { DeviceMapper } from './mappers/device.mapper';
import { DeviceJwtStrategy } from './strategies/device-jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [DeviceController],
  providers: [DeviceService, DeviceRepository, DeviceMapper, DeviceJwtStrategy]
})
export class DeviceModule {}
