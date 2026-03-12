import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { Request } from 'express';
import { JwtPayload } from "@/types/jwt-payload";

const cookieExtractor = (req: Request) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['accessToken'];
    }
    return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,
            secretOrKey: process.env.JWT_SECRET || "super-secret",
        });
    }

    async validate(payload: { sub: string; email: string; role: string }): Promise<JwtPayload> {
        return { userId: payload.sub, email: payload.email, role: payload.role };
    }
}
