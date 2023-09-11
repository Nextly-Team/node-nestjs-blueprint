import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { createUserMockRequest, updateUserMockResponse } from './mock/users.mock';
import { UsersService } from '../src/users/users.service';
import { UsersController } from '../src/users/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../src/users/entity/user.entity';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/allocation'),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        UsersModule
      ],
      providers: [UsersService],
      controllers: [UsersController]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (CREATE USER)',() => {
    return request(app.getHttpServer())
      .post('/users')
      .send(createUserMockRequest)
      .then((result) => {
        expect(result.status).toEqual(201);
        expect(result.body).toHaveProperty('_id');
        expect(result.body).toHaveProperty('name');
        expect(result.body).toHaveProperty('email');
        expect(result.body).toHaveProperty('availability');
      })
  })

  it('/users (GET ALL USERS)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .then((result) => {
        expect(result.status).toEqual(200);
        expect(result.body[0]).toHaveProperty('_id');
        expect(result.body[0]).toHaveProperty('name');
        expect(result.body[0]).toHaveProperty('email');
        expect(result.body[0]).toHaveProperty('availability');
      })
  })

  it('/users/{userId} (GET BY USER ID)', () => {
    return request(app.getHttpServer())
      .get(`/users/${createUserMockRequest._id}`)
      .then((result) => {
        expect(result.status).toEqual(200);
        expect(result.body).toHaveProperty('_id');
        expect(result.body).toHaveProperty('name');
        expect(result.body).toHaveProperty('email');
        expect(result.body).toHaveProperty('availability');
      })
  })

  it('/users/{userId} (UPDATE BY USER ID', () => {
    return request(app.getHttpServer())
    .patch(`/users/${createUserMockRequest._id}`)
    .send(updateUserMockResponse)
    .then((result) => {
      expect(result.status).toEqual(200);
      expect(result.body).toHaveProperty('_id');
      expect(result.body).toHaveProperty('name');
      expect(result.body.name).toEqual('NEXTLY');
      expect(result.body).toHaveProperty('email');
      expect(result.body).toHaveProperty('availability');
    })
  })

  it('/users/{userId} (DELETE BY USER ID', () => {
    return request(app.getHttpServer())
      .delete(`/users/${createUserMockRequest._id}`)
      .expect(200)
  })

  afterAll(async () => {
    request(app.getHttpServer())
      .delete(`/users/${createUserMockRequest._id}`)
    moduleFixture.close();
  });
});

