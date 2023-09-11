import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserPasswordDTO {
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @MinLength(8)
    password: string;

    @IsString()
    @MinLength(8)
    newPassword: string;
}