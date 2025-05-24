const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
    it('should return 200 and a message', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Ok');
    });
});