import request from 'supertest';
import app from '../src/app';

describe('GET /', () => {
  it('should return 200', async () => {
    await request(app).get('/').expect(200);
  });
});
