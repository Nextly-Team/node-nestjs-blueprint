import { IsEnum, IsInt, IsString, Max, Min } from "class-validator";
import { Availability } from "../../enum/availability.enum";
import { Status } from "../../enum/status.enum";

export class UpdateAppointmentDTO {
    @IsInt()
    @Min(1)
    @Max(53)
    weekOfYear: number;

    @IsInt()
    year: number;

    @IsEnum(Status)
    status: Status;

    @IsEnum(Availability)
    availability: Availability;

    @IsString()
    otherAvailability: string;
}