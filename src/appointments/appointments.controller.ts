import { Body, CacheInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDTO } from './dto/create-appointment.dto';
import { SearchAppointmentDTO } from './dto/search-appointment.dto';
import { UpdateAppointmentDTO } from './dto/update-appointment.dto';
import { Appointment } from './entity/appointment.entity';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorator/public.decorator';

@ApiTags('appointments')
@Controller({path: 'appointments', version: '1'})
@UseInterceptors(CacheInterceptor)
export class AppointmentsController {
    constructor(
        private readonly appointmentsService: AppointmentsService
    ){}

    @ApiBearerAuth()
    @ApiBody({type: CreateAppointmentDTO})
    @Post()
    async createAppointment(@Body() createAppointmentDto: CreateAppointmentDTO): Promise<Appointment> {
        return await this.appointmentsService.create(createAppointmentDto);
    }

    @Public()
    @ApiBody({type: SearchAppointmentDTO})
    @Post('/search')
    async searchAppointement(@Body() searchAppointmentDto: SearchAppointmentDTO): Promise<Appointment[]> {
        return await this.appointmentsService.search(searchAppointmentDto);
    }

    @ApiBearerAuth()
    @ApiParam({
        name: 'id',
        required: true,
        type: 'string',
    })
    @Delete(':id')
    async deleteAppointment(@Param('id') id){
        return await this.appointmentsService.deleteById(id);
    }

    @ApiBearerAuth()
    @ApiParam({
        name: 'id',
        required: true,
        type: 'string',
    })
    @ApiBody({type: UpdateAppointmentDTO})
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
