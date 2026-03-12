import { JwtPayload } from "@/types/jwt-payload";
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{user: JwtPayload}>();
    return request.user;
  },
);