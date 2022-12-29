import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';
import { Project, ProjectDocument } from './entity/projects.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    ){}

    async create(createProjectDto: CreateProjectDTO): Promise<Project> {
        const createProject = new this.projectModel(createProjectDto);
        try {
            return await createProject.save();
        }catch(e){
            throw new BadRequestException(e.message);
        }
    }

    async deleteById(_id) {
        try{
            return await this.projectModel.deleteOne({_id});
        }catch(e){
            throw new BadRequestException(e.message);
        }
    }

    async findAll(): Promise<Project[]> {
        return await this.projectModel.find().exec();
    }

    async find(_id): Promise<Project> {
        return await this.projectModel.findById({_id});
    }

    async update(updateProjectDto: UpdateProjectDTO, _id): Promise<Project> {
        try{
            return await this.projectModel.findByIdAndUpdate({_id}, updateProjectDto, { new: true })
        }catch(e){
            throw new BadRequestException(e.message);
        }
    }
}
