require('dotenv').config();
const { generatePromptResponse } = require('../../src/services/story.service');

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
}); 