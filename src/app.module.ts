import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthCheckController } from './health-check.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_HOST),
    UsersModule, 
    ProjectsModule, 
    AppointmentsModule, 
    TerminusModule, 
    HttpModule],
  controllers: [HealthCheckController],
})
export class AppModule {}
