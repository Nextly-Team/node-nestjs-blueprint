import { IsEnum, IsInt, IsString, Max, Min, ValidateNested } from "class-validator";
import { Availability } from "./../../enum/availability.enum";
import { Status } from "./../../enum/status.enum";
import { Project } from "./../../projects/entity/project.entity";
import { User } from "./../../users/entity/user.entity";

export class CreateAppointmentDTO {
    @IsInt()
    @Min(1)
    @Max(53)
    weekOfYear: number;

    @IsInt()
    year: number;

    @ValidateNested()
    user: User;

    @ValidateNested()
    project: Project;

    @IsEnum(Status)
    status: Status;

    @IsEnum(Availability)
    availability: Availability;

    @IsString()
    otherAvailability: string;
}