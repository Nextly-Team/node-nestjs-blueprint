import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import { UsersModule } from "../src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../src/auth/constants/auth.constants";
import { AuthService } from "../src/auth/auth.service";
import { AuthController } from "../src/auth/auth.controller";
import * as request from 'supertest';
import { authUserMockRequest, createAuthUserMockRequest } from "./mock/auth.mock";
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../src/users/entity/user.entity';
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "../src/auth/auth.guard";
import {connections} from 'mongoose';

describe('AuthController (e2e)', () => {
    let app: INestApplication;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost/allocation'),
                MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
                UsersModule,
                JwtModule.register({
                    global:true,
                    secret: jwtConstants.secret,
                    signOptions: { expiresIn: '600s'}
                })
            ],
            controllers: [AuthController],
            providers: [
                {
                    provide: APP_GUARD,
                    useClass: AuthGuard
                },
                AuthService
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    })

    it('/auth/login (USER LOG IN)', async () => {
        await request(app.getHttpServer())
            .post('/users')
            .send(createAuthUserMockRequest)
        request(app.getHttpServer())
            .post('/auth/login')
            .send(authUserMockRequest)
            .then((result) => {
                expect(result.status).toEqual(200);
                expect(result.body).toHaveProperty('access_token')
            })
    })

    it('/auth/profile (USER PROFILE AFTER LOGGED IN)', async () => {
        const auth = await request(app.getHttpServer())
        .post('/auth/login')
        .send(authUserMockRequest)

        request(app.getHttpServer())
            .get('/auth/profile')
            .set('Authorization', `Bearer ${auth.body.access_token}`)
            .then((result) => {
                expect(result.status).toEqual(200);
                expect(result.body).toHaveProperty('sub');
                expect(result.body).toHaveProperty('username');
                expect(result.body).toHaveProperty('iat');
                expect(result.body).toHaveProperty('exp');
            })
    })

    afterAll((done) => {
        request(app.getHttpServer())
        .delete(`/users/${createAuthUserMockRequest._id}`)

        connections.forEach(connection => {
            connection.close(()=>{
                done()
            })
        });
    });
})