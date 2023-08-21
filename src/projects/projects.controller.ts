import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';
import { Project } from './entity/project.entity';
import { ProjectsService } from './projects.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('v1/projects')
export class ProjectsController {
    constructor(
        private readonly projectsService: ProjectsService
    ){}

    @ApiParam(CreateProjectDTO)
    @Post()
    async createProject(@Body() createProjectDto: CreateProjectDTO): Promise<Project> {
        return await this.projectsService.create(createProjectDto);
    }

    @ApiParam({
        name: 'id',
        required: true,
        type: 'string',
    })
    @Delete(':id')
    async deleteProject(@Param('id') id){
        return await this.projectsService.deleteById(id);
    }

    @Get()
    async getAllProjects(): Promise<Project[]> {
        return await this.projectsService.findAll();
    }

    @ApiParam({
        name: 'id',
        required: true,
        type: 'string',
    })
    @Get(':id')
    async getProjectById(@Param('id') id): Promise<Project> {
        return await this.projectsService.find(id);
    }

    @ApiParam({
        name: 'id',
        required: true,
        type: 'string',
    })
    @ApiParam(UpdateProjectDTO)
    @Patch(':id')
    async updateProjectById(@Param('id') id, @Body() updateProjectDto: UpdateProjectDTO): Promise<Project> {
        return await this.projectsService.update(updateProjectDto, id);
    }
}
