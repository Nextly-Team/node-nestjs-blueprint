import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAppointmentDTO } from './dto/create-appointment.dto';
import { SearchAppointmentDTO } from './dto/search-appointment.dto';
import { UpdateAppointmentDTO } from './dto/update-appointment.dto';
import { Appointment, AppointmentDocument } from './entity/appointment.entity';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>
    ){}

    async create(createAppointmentDto: CreateAppointmentDTO): Promise<Appointment> {
        const createAppointment = new this.appointmentModel(createAppointmentDto);
        try{
            return await createAppointment.save();
        }catch(e){
            throw new BadRequestException(e.message);
        }
    }

    async deleteById(_id) {
        try{
            return await this.appointmentModel.deleteOne({_id});
        }catch(e){
            throw new BadRequestException(e.message);
        }
    }

    async update(updateAppointmentDto: UpdateAppointmentDTO, _id): Promise<Appointment> {
        try{
            return await this.appointmentModel.findByIdAndUpdate({_id}, updateAppointmentDto, { new: true });
        }catch(e){
            throw new BadRequestException(e.message);
        }
    }

    async findAll(): Promise<Appointment[]> {
        return await this.appointmentModel.find().exec();
    }

    async find(_id): Promise<Appointment> {
        return await this.appointmentModel.findById({_id});
    }

    async search(searchAppointmentDto: SearchAppointmentDTO): Promise<Appointment[]> {
        const {startWeekOfYear, endWeekOfYear, year, filterBy} = searchAppointmentDto;
        return await this.appointmentModel.find({weekOfYear: {$lte: startWeekOfYear, $gte: endWeekOfYear}, year});
    }
}
