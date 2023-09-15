import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
import { jwtConstants } from "./constants/auth.constants";
import { IS_PUBLIC_KEY } from "./decorator/public.decorator";
import { Reflector } from "@nestjs/core";
import { UsersService } from "../users/users.service";
import { IS_USER_OWNER } from "./decorator/user.owner.decorator";
import { Roles } from "./decorator/roles.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private usersService: UsersService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ])
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request)
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            )
            request['user'] = payload

            const roles = this.reflector.get<string[]>('roles', context.getHandler());
            if (roles){
                if (request.user.roles?.includes(roles.toString()))
                    return true;
            }

            const userOwner = this.reflector.get(IS_USER_OWNER, context.getHandler());
            if(userOwner){
                const user = await this.usersService.find(request.params.id);
                if(request.user.sub != user._id.toString() || user._id.toString() != request.params.id){
                    Logger.log("User request not match!")
                    throw new UnauthorizedException();}
            }

        }catch{
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token: undefined
    }
}