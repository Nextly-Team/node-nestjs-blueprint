import { Body, CacheInterceptor, Controller, Get, HttpCode, HttpStatus, Post, Request, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { AuthLoginDTO } from './dto/auth.login.dto';
import { AuthProfileDTO } from './dto/auth.profile.dto';
import { AuthLoginResponseDTO } from './dto/auth.login.response.dto';

@ApiTags('auth')
@Controller({path: 'auth', version: '1'})
@UseInterceptors(CacheInterceptor)
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @ApiBody({type: AuthLoginDTO})
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signIn: AuthLoginDTO): Promise<AuthLoginResponseDTO> {
        return this.authService.signIn(signIn.email, signIn.password)
    }

    @ApiBearerAuth()
    @Get('profile')
    getProfile(@Request() req): Promise<AuthProfileDTO>{
        return req.user
    }
}
