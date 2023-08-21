import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDTO } from './dto/create-appointment.dto';
import { SearchAppointmentDTO } from './dto/search-appointment.dto';
import { UpdateAppointmentDTO } from './dto/update-appointment.dto';
import { Appointment } from './entity/appointment.entity';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorator/auth.decorator';

@ApiTags('appointments')
@Controller('v1/appointments')
export class AppointmentsController {
    constructor(
        private readonly appointmentsService: AppointmentsService
    ){}

    @ApiParam(CreateAppointmentDTO)
    @Post()
    async createAppointment(@Body() createAppointmentDto: CreateAppointmentDTO): Promise<Appointment> {
        return await this.appointmentsService.create(createAppointmentDto);
    }

    @Public()
    @ApiParam(SearchAppointmentDTO)
    @Post('/search')
    async searchAppointement(@Body() searchAppointmentDto: SearchAppointmentDTO): Promise<Appointment[]> {
        return await this.appointmentsService.search(searchAppointmentDto);
    }

    @ApiParam({
        name: 'id',
        required: true,
        type: 'string',
    })
    @Delete(':id')
    async deleteAppointment(@Param('id') id){
        return await this.appointmentsService.deleteById(id);
    }

    @ApiParam({
        name: 'id',
        required: true,
        type: 'string',
    })
    @ApiParam(UpdateAppointmentDTO)
    @Patch(':id')
    async updateAppointmentById(@Param('id') id, @Body() updateAppointmentDto: UpdateAppointmentDTO): Promise<Appointment> {
        return await this.appointmentsService.update(updateAppointmentDto, id);
    }

    @Public()
    @ApiParam({
        name: 'id',
        required: true,
        type: 'string',
    })
    @Get(':id')
    async getAppointementById(@Param('id') id): Promise<Appointment> {
        return await this.appointmentsService.find(id);
    }

    @Public()
    @Get()
    async getAllAppointments(): Promise<Appointment[]> {
        return await this.appointmentsService.findAll();
    }
}
