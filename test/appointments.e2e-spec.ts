import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from '../src/appointments/entity/appointment.entity';
import { AppointmentsModule } from '../src/appointments/appointments.module';
import { AppointmentsService } from '../src/appointments/appointments.service';
import { AppointmentsController } from '../src/appointments/appointments.controller';
import { createAppointmentMockRequest, searchAppointmentMockRequest, updateAppointmentMockResponse } from './mock/appointments.mock';

describe('AppointmentController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/allocation'),
        MongooseModule.forFeature([{name: Appointment.name, schema: AppointmentSchema}]),
        AppointmentsModule
      ],
      providers: [AppointmentsService],
      controllers: [AppointmentsController]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    moduleFixture.close();
  });

  it('/appointments (CREATE APPOINTMENT)',() => {
    return request(app.getHttpServer())
      .post('/appointments')
      .send(createAppointmentMockRequest)
      .then((result) => {
        expect(result.status).toEqual(201);
        expect(result.body).toHaveProperty('_id');
        expect(result.body).toHaveProperty('weekOfYear');
        expect(result.body).toHaveProperty('year');
        expect(result.body).toHaveProperty('user');
        expect(result.body).toHaveProperty('project');
        expect(result.body).toHaveProperty('status');
        expect(result.body).toHaveProperty('availability');
      })
  })

  it('/appointments/search (SEARCH APPOINTMENT)', () => {
    return request(app.getHttpServer())
      .post('/appointments/search')
      .send(searchAppointmentMockRequest)
      .then((result) => {
        expect(result.status).toEqual(201);
        expect(result.body[0]).toHaveProperty('_id');
        expect(result.body[0]).toHaveProperty('weekOfYear');
        expect(result.body[0]).toHaveProperty('year');
        expect(result.body[0]).toHaveProperty('user');
        expect(result.body[0]).toHaveProperty('project');
        expect(result.body[0]).toHaveProperty('status');
        expect(result.body[0]).toHaveProperty('availability');
      })
  })

  it('/appointments/{appointmentId} (GET BY APPOINTMENT ID)', () => {
    return request(app.getHttpServer())
      .get(`/appointments/${createAppointmentMockRequest._id}`)
      .then((result) => {
        expect(result.status).toEqual(200);
        expect(result.body).toHaveProperty('_id');
        expect(result.body).toHaveProperty('weekOfYear');
        expect(result.body).toHaveProperty('year');
        expect(result.body).toHaveProperty('user');
        expect(result.body).toHaveProperty('project');
        expect(result.body).toHaveProperty('status');
        expect(result.body).toHaveProperty('availability');
      })
  })

  it('/appointments/{appointmentId} (UPDATE APPOINTMENTSER ID', () => {
    return request(app.getHttpServer())
    .patch(`/appointments/${createAppointmentMockRequest._id}`)
    .send(updateAppointmentMockResponse)
    .then((result) => {
      expect(result.status).toEqual(200);
      expect(result.body).toHaveProperty('_id');
      expect(result.body).toHaveProperty('weekOfYear');
      expect(result.body).toHaveProperty('year');
      expect(result.body).toHaveProperty('user');
      expect(result.body).toHaveProperty('project');
      expect(result.body).toHaveProperty('status');
      expect(result.body).toHaveProperty('availability');
      expect(result.body.availability).toEqual('Part-time');
    })
  })

  it('/appointments/{appointmentId} (DELETE BY OPPOINTMENT ID', () => {
    return request(app.getHttpServer())
      .delete(`/appointments/${createAppointmentMockRequest._id}`)
      .expect(200)
  })
});
