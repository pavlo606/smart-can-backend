import { DeviceJwtPayload } from "@/modules/device/dto/device-jwt-payload.dto";
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentDevice = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{user: DeviceJwtPayload}>();
    return request.user;
  },
);