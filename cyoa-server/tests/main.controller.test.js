jest.mock('../src/data/intro.scenarios', () => ({
    getRandomScenario: jest.fn(),
}));

jest.mock('../src/services/story.service', () => ({
    generateIntro: jest.fn(),
    extractChoices: jest.fn(),
}));

const request = require('supertest');
const { generateIntroStory } = require('../src/controllers/main.controller');
const { getRandomScenario } = require('../src/data/intro.scenarios');
const { generateIntro, extractChoices } = require('../src/services/story.service');

describe('Main Controller', () => {

    it('should respond with scenario and 3 choices', async () => {
        const mockScenario = 'You wake up in a strange room.';
        const mockChoicesString = `1. Explore the hallway.
                                   2. Call out for help.
                                   3. Wait and observe silently.`;
        const mockChoices = [
            'Explore the hallway.',
            'Call out for help.',
            'Wait and observe silently.'
        ];

        getRandomScenario.mockReturnValue(mockScenario);
        generateIntro.mockReturnValue(mockChoicesString);
        extractChoices.mockReturnValue(mockChoices);

        const req = {};
        const res = {
            json: jest.fn()
        };

        generateIntroStory(req, res);

        expect(getRandomScenario).toHaveBeenCalled();
        expect(generateIntro).toHaveBeenCalledWith(mockScenario);
        expect(extractChoices).toHaveBeenCalledWith(mockChoicesString);

        expect(res.json).toHaveBeenCalledWith({
            scenario: mockScenario,
            first_choice: mockChoices[0],
            second_choice: mockChoices[1],
            third_choice: mockChoices[2]
        });
    });
});