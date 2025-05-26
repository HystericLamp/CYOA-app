const { openai, MODEL } = require('../config/openai');

exports.generatePromptResponse = async (prompt) => {
    try {
        const completion = await openai.chat.completions.create({
            model: MODEL,
            messages: [{ role: 'user', content: prompt }],
        });
        
        return completion.choices[0].message.content;
    } catch (error) {
        if (error.name === 'APIError') {
            throw new Error(`OpenAI API Error: ${error.message}`);
        } else if (error.name === 'APIConnectionError') {
            throw new Error('Failed to connect to OpenAI API. Please check your internet connection.');
        } else if (error.name === 'RateLimitError') {
            throw new Error('OpenAI API rate limit exceeded. Please try again later.');
        } else if (error.name === 'AuthenticationError') {
            throw new Error('Invalid OpenAI API key. Please check your configuration.');
        }
        
        throw new Error(`Error generating response: ${error.message}`);
    }
}

const generatePromptResponse = exports.generatePromptResponse;
exports.generateIntro = async (introScenario) => {
    const prompt = `
    You are a storyteller.
    You are given a scenario and you need to generate a story based on the scenario.
    Scenario: "${introScenario}"
    Please provide at least 3 different choices for the user to choose from to get the story started.
    `;

    const response = await generatePromptResponse(prompt);

    return response;
}