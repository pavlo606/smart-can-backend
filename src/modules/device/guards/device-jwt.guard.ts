import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class DeviceJwtAuthGuard extends AuthGuard('device-jwt') {
  handleRequest(err: unknown, user: any, info: any) {
    if (err || !user) {
      const errorMessage = info?.message || 'Device authentication failed';

      throw err || new UnauthorizedException(errorMessage);
    }

    return user;
  }
}