import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDTO } from './dto/create-appointment.dto';
import { SearchAppointmentDTO } from './dto/search-appointment.dto';
import { UpdateAppointmentDTO } from './dto/update-appointment.dto';
import { Appointment } from './entity/appointment.entity';

@Controller('appointment')
export class AppointmentController {
    constructor(
        private readonly appointmentService: AppointmentService
    ){}

    @Post()
    async createAppointment(@Body() createAppointmentDto: CreateAppointmentDTO): Promise<Appointment> {
        return await this.appointmentService.create(createAppointmentDto);
    }

    @Post('/search')
    async searchAppointement(@Body() searchAppointmentDto: SearchAppointmentDTO): Promise<Appointment[]> {
        return await this.appointmentService.search(searchAppointmentDto);
    }

    @Delete(':id')
    async deleteAppointment(@Param('id') id){
        return await this.appointmentService.deleteById(id);
    }

    @Patch(':id')
    async updateAppointmentById(@Param('id') id, @Body() updateAppointmentDto: UpdateAppointmentDTO): Promise<Appointment> {
        return await this.appointmentService.update(updateAppointmentDto, id);
    }

    @Get(':id')
    async getAppointementById(@Param('id') id): Promise<Appointment> {
        return await this.appointmentService.find(id);
    }
}
