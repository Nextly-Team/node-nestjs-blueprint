import { IsEnum, IsInt, IsString, Max, Min, ValidateNested } from "class-validator";
import { Availability } from "../../enum/availability.enum";
import { Status } from "../../enum/status.enum";
import { Project } from "../../projects/entity/project.entity";
import { User } from "../../users/entity/user.entity";

class FilterByDTO {

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

export class SearchAppointmentDTO {
    @IsInt()
    @Min(1)
    @Max(53)
    startWeekOfYear: number;

    @IsInt()
    @Min(1)
    @Max(53)
    endWeekOfYear: number;

    @IsInt()
    year: number;

    @IsString()
    filterBy: FilterByDTO;
}

