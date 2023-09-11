import * as request from 'supertest';

export const createUserFixture = async (data, url, app) => {
    return await request(app.getHttpServer()).post(url).send(data)
    
}