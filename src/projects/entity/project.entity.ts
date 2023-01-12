import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProjectDocument = HydratedDocument<Project>

@Schema()
export class Project {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, unique: true })
    tag: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);