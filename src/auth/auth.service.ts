import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { decriptPassword } from '../security/hash';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, pass: string): Promise<any> {
        if (!email && !pass) {
            throw new UnauthorizedException();
        }
        const user = await this.usersService.findByEmail(email);
        const password = await decriptPassword(pass, user.password)
        if (!password){
            throw new UnauthorizedException();
        }
        const payload = { sub: user._id, username: user.email, roles: user.roles };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
