import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Availability } from "./../../enum/availability.enum";
import { Status } from "./../../enum/status.enum";
import { Project } from "./../../projects/entity/project.entity";
import { User } from "../../users/entity/user.entity";

export type AppointmentDocument = HydratedDocument<Appointment>

@Schema()
export class Appointment {
    @Prop({ required: true })
    weekOfYear: Number;

    @Prop({ required: true })
    year: Number;

    @Prop({ required: true })
    user: User;

    @Prop({ required: true })
    project: Project;

    @Prop({ required: true, type: String })
    status: {
        type: String,
        default: Status.Allocated,
        enum: Status
    }

    @Prop({ required: true, type: String })
    availability: {
        type: String,
        default: Availability.Full,
        enum: Availability
    }

    @Prop({ required: false })
    otherAvailability: String;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);