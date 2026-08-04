import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: unknown, user: any, info: any) {
    if (err || !user) {
      const errorMessage = info?.message || 'Authentication failed';

      throw err || new UnauthorizedException(errorMessage);
    }

    return user;
  }
}