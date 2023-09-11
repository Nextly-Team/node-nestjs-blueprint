import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Availability } from "../../enum/availability.enum";
import { RolesEnum } from "../../enum/roles.enum";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    _id: string

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

    @Prop({ required: true, type: String, minlength: 8})
    password: string;

    @Prop({ required: true})
    roles: [
        {
            type: string,
            default: RolesEnum.User,
            enum: RolesEnum
        }
    ]
}

export const UserSchema = SchemaFactory.createForClass(User);