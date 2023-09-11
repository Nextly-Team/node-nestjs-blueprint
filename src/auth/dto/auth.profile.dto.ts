import { IsNumber, IsString } from "class-validator"

export class AuthProfileDTO {
    @IsString()
    sub: string;

    @IsString()
    username: string;
    
    @IsNumber()
    iat: number;

    @IsNumber()
    exp: number;
}