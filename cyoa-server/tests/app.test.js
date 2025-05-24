const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
    it('should return 200 and a message', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Ok');
    });
});

describe('GET /next', () => {
    it('should return story segment with choices', async () => {
        const response = await request(app).get('/next');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('choices');
        expect(Array.isArray(response.body.choices)).toBe(true);
    });
});