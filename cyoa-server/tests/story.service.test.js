const request = require('supertest');
const { generateNextStory } = require('../src/services/story.service');
const { openai } = require('../src/config/openai');

// Mock the OpenAI module
jest.mock('../src/config/openai', () => ({
    openai: {
        chat: {
            completions: {
                create: jest.fn()
            }
        }
    },
    MODEL: 'gpt-3.5-turbo'
}));

describe('Story Service', () => {
    beforeEach(() => {
        // Clear mock before each test
        jest.clearAllMocks();
    });

    describe('generateNextStory', () => {
        it('should successfully generate a response from OpenAI', async () => {
            // Mock a request for userAction and storySteps
            const mockRequest = {
                body: {
                    userAction: "Test prompt",
                    storyStep: 3
                }
            }

            // Mock successful API response
            const mockResponse = {
                choices: [
                    {
                        message: {
                            content: 'This is a test response'
                        }
                    }
                ]
            };
            openai.chat.completions.create.mockResolvedValue(mockResponse);

            const { userAction, storyStep } = mockRequest.body;
            const result = await generateNextStory(userAction, storyStep);
            expect(result).toBe('This is a test response');

            const content = `
            The user has made the following choice: "${userAction}"
            This is step ${storyStep ?? '{storyStep}'} of the story.

            Continue the story based on the user's choice.
            The result should be a maximum of 2 paragraphs.

            If the story feels naturally complete, or this is step ${storyStep >= 5 ? storyStep : '{storyStep}'}, end the story with a proper conclusion and do NOT provide more choices.

            If the story continues, provide a maximum of 3 different choices for the user to choose from in the format:
            "1.", "2.", "3.", etc.
            `.trim();

            expect(openai.chat.completions.create).toHaveBeenCalled();
            const callArgs = openai.chat.completions.create.mock.calls[0][0];

            expect(callArgs.model).toBe("gpt-3.5-turbo");
            expect(callArgs.messages[0].role).toBe("user");
            expect(callArgs.messages[0].content).toContain("The user has made the following choice: \"Test prompt\"");
            expect(callArgs.messages[0].content).toContain("This is step 3 of the story.");
        });

        it('should handle APIError correctly', async () => {
            const apiError = new Error('API Error');
            apiError.name = 'APIError';
            openai.chat.completions.create.mockRejectedValue(apiError);

            await expect(generateNextStory('Test prompt'))
                .rejects
                .toThrow('OpenAI API Error: API Error');
        });

        it('should handle APIConnectionError correctly', async () => {
            const connectionError = new Error('Connection Error');
            connectionError.name = 'APIConnectionError';
            openai.chat.completions.create.mockRejectedValue(connectionError);

            await expect(generateNextStory('Test prompt'))
                .rejects
                .toThrow('Failed to connect to OpenAI API. Please check your internet connection.');
        });

        it('should handle RateLimitError correctly', async () => {
            const rateLimitError = new Error('Rate limit exceeded');
            rateLimitError.name = 'RateLimitError';
            openai.chat.completions.create.mockRejectedValue(rateLimitError);

            await expect(generateNextStory('Test prompt'))
                .rejects
                .toThrow('OpenAI API rate limit exceeded. Please try again later.');
        });

        it('should handle AuthenticationError correctly', async () => {
            const authError = new Error('Invalid API key');
            authError.name = 'AuthenticationError';
            openai.chat.completions.create.mockRejectedValue(authError);

            await expect(generateNextStory('Test prompt'))
                .rejects
                .toThrow('Invalid OpenAI API key. Please check your configuration.');
        });

        it('should handle unexpected errors correctly', async () => {
            const unexpectedError = new Error('Unexpected error');
            openai.chat.completions.create.mockRejectedValue(unexpectedError);

            await expect(generateNextStory('Test prompt'))
                .rejects
                .toThrow('Error generating response: Unexpected error');
        });
    });
});