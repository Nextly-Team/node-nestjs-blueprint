import { IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserDTO {
    @IsString()
    @MinLength(10)
    @MaxLength(100)
    name: string;
}