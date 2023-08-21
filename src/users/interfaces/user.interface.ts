import { Availability } from "../../enum/availability.enum";

export interface IUser{
    _id: string;
    name: string;
    email: string;
    availability: {
        type: string,
        default: Availability.Full,
        enum: Availability
    };
}