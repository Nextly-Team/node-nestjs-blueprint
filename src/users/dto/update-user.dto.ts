import { IsArray, IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Availability } from "../../enum/availability.enum";
import { RolesEnum } from "../../enum/roles.enum";

export class UpdateUserDTO {
    @IsString()
    @MinLength(10)
    @MaxLength(100)
    name: string;

    @IsOptional()
    @IsEnum(Availability)
    availability: Availability;

    @IsOptional()
    @IsEnum(RolesEnum, {each: true})
    roles: RolesEnum[]
}