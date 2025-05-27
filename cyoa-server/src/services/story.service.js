const { openai, MODEL } = require('../config/openai');

/**
 * Generate a response from the OpenAI API based on the user's action
 * @param {string} userAction - The user's action to generate a response from
 * @returns {string} - The response from the OpenAI API
 */
exports.generateNextStory = async (userAction) => {
    const prompt = `
    The user has made the following choice: "${userAction}"
    Please continue the story based on the user's choice.
    Provide a result of the user's choice to the story.
    The result should be a maximum of 2 paragraphs.
    And provide 3 different choices for the user to choose from to continue the story, unless result is a dead end to the story.
    The choices should be in the format of "1.", "2.", "3.", etc.
    `;

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


const generateNextStory = exports.generateNextStory;

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
    Also, continue this for the next story segment(s) based on the user's choice.
    The choices should be in the format of "1.", "2.", "3.", etc.
    `;

    const response = await generateNextStory(prompt);

    return response;
}

/**
 * Extract the result of the user's choice from a string
 * Should be used after the generateNextStory function
 * Gets the paragraph before the first choice
 * @param {string} resultText - The text containing the result of the user's choice
 * @returns {string} - The result of the user's choice
 */
exports.extractResult = (resultText) => {
    const resultRegex = /^[\s\S]*?(?=\n\s*1\.)/;
    const result = resultText.match(resultRegex);
    return result[0].trim();
}

/**
 * Extract choices from a string that has all the choices in listed-number format. E.g. "1.", "2.", "3.", etc.
 * @param {string} choices - The string containing the choices
 * @returns {string[]} - An array of choices
 */
exports.extractChoices = (choicesText) => {
    const choiceRegex = /^\s*\d+\.\s+(.+)$/gm;

    const choices = []
    let match;

    while ((match = choiceRegex.exec(choicesText)) !== null) {
        choices.push(match[1].trim());
    }

    return choices;
}