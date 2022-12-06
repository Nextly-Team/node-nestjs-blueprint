import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { CalendarModule } from './calendar/calendar.module';
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
    // ProjectsModule, 
    // CalendarModule, 
    TerminusModule, 
    HttpModule],
  controllers: [AppController, HealthCheckController],
  providers: [AppService],
})
export class AppModule {}
