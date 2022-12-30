import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { Availability } from "../../enum/availability.enum";

export class CreateUserDTO {
    @IsString()
    @MinLength(10)
    @MaxLength(100)
    name: string;
    
    @IsEmail()
    email: string;

    @IsEnum(Availability)
    availability: Availability;
}