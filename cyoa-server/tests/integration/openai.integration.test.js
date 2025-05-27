require('dotenv').config();
const { generateIntro, generateNextStory } = require('../../src/services/story.service');
const { getRandomScenario } = require('../../src/data/intro.scenarios');

describe('OpenAI Integration', () => {
    // Store story context between tests
    let storyContext = {
        currentStory: '',
        lastChoices: []
    };

    beforeAll(() => {
        console.log('STORY_TELLER_KEY exists:', !!process.env.STORY_TELLER_KEY);
    });

    jest.setTimeout(15000);

    it('should generate a story intro', async () => {
        const introScenario = getRandomScenario();
        
        console.log('Intro Scenario:', introScenario);

        const response = await generateIntro(introScenario);
        expect(typeof response).toBe('string');
        console.log('Response:', response);

        // Store the intro response for the next test
        storyContext.currentStory = response;

        // Check if the response contains at least 3 choices
        const choicePattern = /^\s*\d+\.\s+(.+)$/gm;
        const matches = response.match(choicePattern);
        expect(matches).not.toBeNull();
        expect(matches.length).toBeGreaterThanOrEqual(3);

        // Store the choices for the next test
        storyContext.lastChoices = [...response.matchAll(choicePattern)].map(match => match[1]);
    });

    it('should generate a next story segment based on previous intro', async () => {
        expect(storyContext.currentStory).toBeTruthy();
        expect(storyContext.lastChoices.length).toBeGreaterThanOrEqual(3);

        const userAction = storyContext.lastChoices[0];
        
        const nextStorySegment = await generateNextStory(userAction);

        expect(typeof nextStorySegment).toBe('string');
        console.log('Next Story Segment:', nextStorySegment);
        
        const choicePattern = /^\s*\d+\.\s+(.+)$/gm;
        const newChoices = [...nextStorySegment.matchAll(choicePattern)].map(match => match[1]);
        expect(newChoices.length).toBeGreaterThanOrEqual(3);

        console.log('New Choices:', newChoices);
    });
}); 