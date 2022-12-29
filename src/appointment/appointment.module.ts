import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { Appointment, AppointmentSchema } from './entity/appointment.entity';

@Module({
  imports:[MongooseModule.forFeature([{ name: Appointment.name, schema: AppointmentSchema}])],
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule {}
