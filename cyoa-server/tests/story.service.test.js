const request = require('supertest');
const { generatePromptResponse } = require('../src/services/story.service');
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

    describe('generatePromptResponse', () => {
        it('should successfully generate a response from OpenAI', async () => {
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

            const result = await generatePromptResponse('Test prompt');
            expect(result).toBe('This is a test response');
            expect(openai.chat.completions.create).toHaveBeenCalledWith({
                model: expect.any(String),
                messages: [{ role: 'user', content: 'Test prompt' }]
            });
        });

        it('should handle APIError correctly', async () => {
            const apiError = new Error('API Error');
            apiError.name = 'APIError';
            openai.chat.completions.create.mockRejectedValue(apiError);

            await expect(generatePromptResponse('Test prompt'))
                .rejects
                .toThrow('OpenAI API Error: API Error');
        });

        it('should handle APIConnectionError correctly', async () => {
            const connectionError = new Error('Connection Error');
            connectionError.name = 'APIConnectionError';
            openai.chat.completions.create.mockRejectedValue(connectionError);

            await expect(generatePromptResponse('Test prompt'))
                .rejects
                .toThrow('Failed to connect to OpenAI API. Please check your internet connection.');
        });

        it('should handle RateLimitError correctly', async () => {
            const rateLimitError = new Error('Rate limit exceeded');
            rateLimitError.name = 'RateLimitError';
            openai.chat.completions.create.mockRejectedValue(rateLimitError);

            await expect(generatePromptResponse('Test prompt'))
                .rejects
                .toThrow('OpenAI API rate limit exceeded. Please try again later.');
        });

        it('should handle AuthenticationError correctly', async () => {
            const authError = new Error('Invalid API key');
            authError.name = 'AuthenticationError';
            openai.chat.completions.create.mockRejectedValue(authError);

            await expect(generatePromptResponse('Test prompt'))
                .rejects
                .toThrow('Invalid OpenAI API key. Please check your configuration.');
        });

        it('should handle unexpected errors correctly', async () => {
            const unexpectedError = new Error('Unexpected error');
            openai.chat.completions.create.mockRejectedValue(unexpectedError);

            await expect(generatePromptResponse('Test prompt'))
                .rejects
                .toThrow('Error generating response: Unexpected error');
        });
    });
});