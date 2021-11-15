import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_SECRET } from "../../config/constants";
import { AuthService } from "../auth.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get(JWT_SECRET)
        });
    }

    async validate(payload: IJwtPayload) {
        const { username } = payload;
        const user = await this.authService.login(username);
        if (!user) {
          const result = { status: 'error', data: 'User or Password not is correct' };
          return new BadRequestException(result);
        }
        
        return payload;
        // return { userId: payload.sub, username: payload.username };
        
      }
}