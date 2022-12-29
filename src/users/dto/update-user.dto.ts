import { IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { Availability } from "src/enum/availability.enum";

export class UpdateUserDTO {
    @IsString()
    @MinLength(10)
    @MaxLength(100)
    name: string;

    @IsEnum(Availability)
    availability: Availability;
}