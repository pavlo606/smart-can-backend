import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { DeviceJwtPayload } from "../dto/device-jwt-payload.dto";

@Injectable()
export class DeviceJwtStrategy extends PassportStrategy(Strategy, "device-jwt") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || "super-secret",
        });
    }

    async validate(payload: { sub: string; jti: string }): Promise<DeviceJwtPayload> {
        return {
            deviceId: payload.sub,
            jti: payload.jti,
        };
    }
}
