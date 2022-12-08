import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';
import { Project } from './entity/project.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(
        private readonly projectsService: ProjectsService
    ){}

    @Post()
    async createProject(@Body() createProjectDto: CreateProjectDTO): Promise<Project> {
        return await this.projectsService.create(createProjectDto);
    }

    @Delete(':id')
    async deleteProject(@Param('id') id){
        return await this.projectsService.deleteById(id);
    }

    @Get()
    async getAllProjects(): Promise<Project[]> {
        return await this.projectsService.findAll();
    }

    @Get(':id')
    async getProjectById(@Param('id') id): Promise<Project> {
        return await this.projectsService.find(id);
    }

    @Patch(':id')
    async updateProjectById(@Param('id') id, @Body() updateProjectDto: UpdateProjectDTO): Promise<Project> {
        return await this.projectsService.update(updateProjectDto, id);
    }
}
