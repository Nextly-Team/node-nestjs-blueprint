import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthCheckController } from './health-check.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_HOST),
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 10,
    }]),
    UsersModule, 
    ProjectsModule, 
    AppointmentsModule, 
    TerminusModule, 
    HttpModule,
    AuthModule
  ],
  controllers: [HealthCheckController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
