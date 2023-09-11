import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { Availability } from "../../enum/availability.enum";
import { RolesEnum } from "../../enum/roles.enum";

export class CreateUserDTO {
    @IsString()
    @MinLength(10)
    @MaxLength(100)
    name: string;
    
    @IsEmail()
    email: string;

    @IsEnum(Availability)
    availability: Availability;

    @IsString()
    @MinLength(8)
    password: string;

    @IsEnum(RolesEnum)
    roles: [RolesEnum]
}