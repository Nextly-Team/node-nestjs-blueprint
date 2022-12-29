import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './../src/appointment/entity/appointment.entity';
import { AppointmentModule } from './../src/appointment/appointment.module';
import { AppointmentService } from './../src/appointment/appointment.service';
import { AppointmentController } from './../src/appointment/appointment.controller';
import { createAppointmentMockRequest, searchAppointmentMockRequest, updateAppointmentMockResponse } from './mock/appointmentMock';

describe('AppointmentController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/allocation'),
        MongooseModule.forFeature([{name: Appointment.name, schema: AppointmentSchema}]),
        AppointmentModule
      ],
      providers: [AppointmentService,
        {
          provide: getModelToken(Appointment.name),
          useValue: 'appointmentModel'
        }],
      controllers: [AppointmentController]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    moduleFixture.close();
  });

  it('/appointment (CREATE APPOINTMENT)',() => {
    return request(app.getHttpServer())
      .post('/v1/appointment')
      .send(createAppointmentMockRequest)
      .then((result) => {
        expect(result.statusCode).toEqual(201);
        expect(result.body).toHaveProperty('_id');
        expect(result.body).toHaveProperty('weekOfYear');
        expect(result.body).toHaveProperty('year');
        expect(result.body).toHaveProperty('user');
        expect(result.body).toHaveProperty('project');
        expect(result.body).toHaveProperty('status');
        expect(result.body).toHaveProperty('availability');
      })
  })

  it('/appointment/search (SEARCH APPOINTMENT)', () => {
    return request(app.getHttpServer())
      .post('/v1/appointment/search')
      .send(searchAppointmentMockRequest)
      .then((result) => {
        expect(result.statusCode).toEqual(201);
        expect(result.body[0]).toHaveProperty('_id');
        expect(result.body[0]).toHaveProperty('weekOfYear');
        expect(result.body[0]).toHaveProperty('year');
        expect(result.body[0]).toHaveProperty('user');
        expect(result.body[0]).toHaveProperty('project');
        expect(result.body[0]).toHaveProperty('status');
        expect(result.body[0]).toHaveProperty('availability');
      })
  })

  it('/appointment/{appointmentId} (GET BY APPOINTMENT ID)', () => {
    return request(app.getHttpServer())
      .get(`/v1/appointment/${createAppointmentMockRequest._id}`)
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('_id');
        expect(result.body).toHaveProperty('weekOfYear');
        expect(result.body).toHaveProperty('year');
        expect(result.body).toHaveProperty('user');
        expect(result.body).toHaveProperty('project');
        expect(result.body).toHaveProperty('status');
        expect(result.body).toHaveProperty('availability');
      })
  })

  it('/appointment/{appointmentId} (UPDATE APPOINTMENTSER ID', () => {
    return request(app.getHttpServer())
    .patch(`/v1/appointment/${createAppointmentMockRequest._id}`)
    .send(updateAppointmentMockResponse)
    .then((result) => {
      expect(result.statusCode).toEqual(200);
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

  it('/appointment/{appointmentId} (DELETE BY OPPOINTMENT ID', () => {
    return request(app.getHttpServer())
      .delete(`/v1/appointment/${createAppointmentMockRequest._id}`)
      .expect(200)
  })
});
