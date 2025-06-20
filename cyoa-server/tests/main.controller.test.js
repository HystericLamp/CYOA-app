jest.mock('../src/data/intro.scenarios', () => ({
    getRandomScenario: jest.fn(),
}));

jest.mock('../src/services/story.service', () => ({
    generateIntro: jest.fn(),
    extractChoices: jest.fn(),
    generateNextStory: jest.fn(),
    extractResult: jest.fn()
}));

const request = require('supertest');
const { generateIntroStory, nextStoryPrompt, resetStory } = require('../src/controllers/main.controller');
const { getRandomScenario } = require('../src/data/intro.scenarios');
const { generateIntro, extractChoices, generateNextStory, extractResult } = require('../src/services/story.service');

describe('Main Controller', () => {

    it('should respond with an Intro scenario and 3 choices', async () => {
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

        const req = {
            session: {
                storySteps: []
            }
        };

        const res = {
            json: jest.fn()
        };

        await generateIntroStory(req, res);

        expect(getRandomScenario).toHaveBeenCalled();
        expect(generateIntro).toHaveBeenCalledWith(mockScenario);
        expect(extractChoices).toHaveBeenCalledWith(mockChoicesString);

        expect(res.json).toHaveBeenCalledWith({
            scenario: mockScenario,
            choices: mockChoices
        });
    });

    it('should respond with a result and 3 choices', async () => {
        const mockUserAction = 'You enter a room with a table.';

        const mockResponse = `
        You find a key on the table.
        1. Use the key to unlock the door.
        2. Leave the room and explore the hallway.
        3. Try to break the door down.
        `;

        const mockResult = 'You find a key on the table.';
        
        const mockChoices = [
            'Use the key to unlock the door.',
            'Leave the room and explore the hallway.',
            'Try to break the door down.'
        ];

        generateNextStory.mockReturnValue(mockResponse);
        extractResult.mockReturnValue(mockResult);
        extractChoices.mockReturnValue(mockChoices);

        const req = {
            body: {
                userAction: mockUserAction
            },
            session: {
                storySteps: []
            }
        };

        const res = {
            json: jest.fn()
        };

        await nextStoryPrompt(req, res);

        expect(generateNextStory).toHaveBeenCalled();
        expect(extractResult).toHaveBeenCalledWith(mockResponse);
        expect(extractChoices).toHaveBeenCalledWith(mockResponse);

        expect(res.json).toHaveBeenCalledWith({
            result: mockResult,
            choices: mockChoices,
            end: false,
            path: ["You enter a room with a table."]
        });
    });

    it(('Should reset the session and story data'), async () => {
        const req = {
            session: {
                storySteps: ['step1', 'step2', 'step3']
            }
        };

        const res = {
            json: jest.fn()
        };

        resetStory(req, res);

        expect(req.session.storySteps).toEqual([]);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Story session reset.',
            reset: true
        });
    });
});