const request = require('supertest');
const express = require('express');

jest.mock('../src/controllers/main.controller', () => {
    const actualIntro = jest.requireActual('../src/controllers/main.controller');
    return {
        ...actualIntro,
        generateIntroStory: jest.fn((req, res) => res.json({
            story: 'Mocked Story',
            choices: ['Choice 1', 'Choice 2', 'Choice 3']
        })),
        nextStoryPrompt: jest.fn((req, res) => res.json({
            result: 'Mocked Result',
            choices: ['Choice 1', 'Choice 2', 'Choice 3']
        }))
    };
});

const app = express();
const router = require('../src/routes/index');
app.use(express.json());
app.use('/', router);
const { intro, generateIntroStory, nextStoryPrompt } = require('../src/controllers/main.controller');

describe('API Endpoint Tests', () => {
    // Not mocked
    it('GET / should return 200 and a message', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Ok');
    });

    // Mocked story and choices
    it('GET /story should return 200 and an intro story with choices in JSON format', async () => {
        const response = await request(app).get('/story');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ story: 'Mocked Story', choices: ['Choice 1', 'Choice 2', 'Choice 3'] });
    });

    // Mocked result and choices
    it('POST /story should return 200 and a result with choices in JSON format', async () => {
        const response = await request(app).post('/story').send({ userAction: 'You enter a room with a table.' });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ result: 'Mocked Result', choices: ['Choice 1', 'Choice 2', 'Choice 3'] });
    });
    
});