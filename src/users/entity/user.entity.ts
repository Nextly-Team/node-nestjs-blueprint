import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Availability } from "../../enum/availability.enum";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, type: String})
    availability: {
        type: string,
        default: Availability.Full,
        enum: Availability
    }
}

export const UserSchema = SchemaFactory.createForClass(User);