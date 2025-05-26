const { getRandomScenario } = require('../data/intro.scenarios');
const { generateIntro, generatePromptResponse, extractChoices } = require('../services/story.service');

/**
 * Check if the server is running
 * @param {*} request 
 * @param {*} response 
 */
exports.intro = (request, response) => {
    response.json({ 
        message: 'Ok',
        status: 'active'
    });
};

/**
 * Generate an intro to story with 3 choices
 * Should be used in the GET request to generate the first story
 * @param {*} request 
 * @param {*} response 
 */
exports.generateIntroStory = (request, response) => {
    const scenario = getRandomScenario();
    const story = generateIntro(scenario);
    const choices = extractChoices(story);
    
    response.json({
        scenario: scenario,
        first_choice: choices[0],
        second_choice: choices[1],
        third_choice: choices[2]
    });
};

// TODO: Implement a POST request to generate a next story prompt
// Take user action and generate the next story scenario
exports.nextStoryPrompt = (request, response) => {
    response.json({
        message: 'Next story segment',
        currentPage: 1,
        choices: [
            { id: 1, text: 'Go left' },
            { id: 2, text: 'Go right' }
        ]
    });
};
