require('dotenv').config();
const { generatePromptResponse, generateIntro } = require('../../src/services/story.service');
const { scenarios } = require('../../src/data/intro.scenarios');

describe('OpenAI Integration', () => {
    beforeAll(() => {
        // Log environment variable status (but not the actual key)
        console.log('STORY_TELLER_KEY exists:', !!process.env.STORY_TELLER_KEY);
    });

    // Set longer timeout since we're making real API calls
    jest.setTimeout(15000);

    it('should successfully call OpenAI API and get a response', async () => {
        const prompt = 'Write a single sentence about a cat.';
        const response = await generatePromptResponse(prompt);
        
        // Verify we got a non-empty string response
        expect(typeof response).toBe('string');
        expect(response.length).toBeGreaterThan(0);
    });

    it('should handle a more complex prompt', async () => {
        const prompt = 'Write a two-sentence story about a magical forest.';
        const response = await generatePromptResponse(prompt);
        
        // Verify response contains multiple sentences
        expect(response.split('.').length).toBeGreaterThan(1);
        expect(response.length).toBeGreaterThan(20);
    });

    it('should generate a story intro', async () => {
        const randomIndex = Math.floor(Math.random() * scenarios.length);
        const introScenario = scenarios[randomIndex];
        
        console.log('Intro Scenario:', introScenario);

        const response = await generateIntro(introScenario);
        expect(typeof response).toBe('string');
        console.log('Response:', response);

        // Validate that there are at least 3 choices (e.g., lines starting with "1.", "2.", etc.)
        const choicePattern = /^\s*\d+\.\s+/gm;
        const matches = response.match(choicePattern);
        expect(matches).not.toBeNull();
        expect(matches.length).toBeGreaterThanOrEqual(3);
    });
}); 