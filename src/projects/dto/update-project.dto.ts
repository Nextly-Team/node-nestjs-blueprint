import { IsString, MaxLength } from "class-validator";

export class UpdateProjectDTO {
    @IsString()
    @MaxLength(100)
    name: string;

    @IsString()
    @MaxLength(3)
    tag: string;
}