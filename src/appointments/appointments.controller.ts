import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDTO } from './dto/create-appointment.dto';
import { SearchAppointmentDTO } from './dto/search-appointment.dto';
import { UpdateAppointmentDTO } from './dto/update-appointment.dto';
import { Appointment } from './entity/appointment.entity';

@Controller('v1/appointments')
export class AppointmentsController {
    constructor(
        private readonly appointmentsService: AppointmentsService
    ){}

    @Post()
    async createAppointment(@Body() createAppointmentDto: CreateAppointmentDTO): Promise<Appointment> {
        return await this.appointmentsService.create(createAppointmentDto);
    }

    @Post('/search')
    async searchAppointement(@Body() searchAppointmentDto: SearchAppointmentDTO): Promise<Appointment[]> {
        return await this.appointmentsService.search(searchAppointmentDto);
    }

    @Delete(':id')
    async deleteAppointment(@Param('id') id){
        return await this.appointmentsService.deleteById(id);
    }

    @Patch(':id')
    async updateAppointmentById(@Param('id') id, @Body() updateAppointmentDto: UpdateAppointmentDTO): Promise<Appointment> {
        return await this.appointmentsService.update(updateAppointmentDto, id);
    }

    @Get(':id')
    async getAppointementById(@Param('id') id): Promise<Appointment> {
        return await this.appointmentsService.find(id);
    }

    @Get()
    async getAllAppointments(): Promise<Appointment[]> {
        return await this.appointmentsService.findAll();
    }
}
