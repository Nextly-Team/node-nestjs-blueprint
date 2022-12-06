import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsString()
    @MinLength(10)
    @MaxLength(100)
    name: string;
    
    @IsEmail()
    email: string;
}