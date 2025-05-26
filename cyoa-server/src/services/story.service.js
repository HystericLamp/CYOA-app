const { openai, MODEL } = require('../config/openai');

/**
 * Generate a response from the OpenAI API
 * @param {string} prompt - The prompt to generate a response from
 * @returns {string} - The response from the OpenAI API
 */
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

/**
 * Generate 3 choices from an intro scenario
 * @param {string} introScenario - The intro scenario to a story
 * @returns {string} - 3 choices based on the intro scenario in listed-number format
 */
exports.generateIntro = async (introScenario) => {
    const prompt = `
    You are a storyteller.
    You are given a scenario and you need to generate a story based on the scenario.
    Scenario: "${introScenario}"
    Please provide at least 3 different choices for the user to choose from to get the story started.
    The choices should be in the format of "1.", "2.", "3.", etc.
    `;

    const response = await generatePromptResponse(prompt);

    return response;
}

/**
 * Extract choices from a string that has all the choices in listed-number format. E.g. "1.", "2.", "3.", etc.
 * @param {string} choices - The string containing the choices
 * @returns {string[]} - An array of choices
 */
exports.extractChoices = (choicesText) => {
    const choiceRegex = /\d+\.\s+([\s\S]*?)(?=\n\d+\.|\n*$)/g;

    const choices = []
    let match;

    while ((match = choiceRegex.exec(choicesText)) !== null) {
        choices.push(match[1].trim());
    }

    return choices;
}