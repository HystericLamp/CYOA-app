const { getRandomScenario } = require('../data/intro.scenarios');
const { generateIntro, generateNextStory, extractChoices, extractResult } = require('../services/story.service');

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
 * Should be used in the GET request to generate the Intro to the story
 * @param {*} request 
 * @param {*} response 
 */
exports.generateIntroStory = (request, response) => {
    const scenario = getRandomScenario();
    const story = generateIntro(scenario);
    const choices = extractChoices(story);
    
    response.json({
        scenario: scenario,
        choices: choices
    });
};

/**
 * Generate a next story prompt based on the user's action
 * Should be used in the POST request to generate the next story prompt
 * Returns the result of the user's choice, and 3 choices for the next part of the story
 * @param {*} request 
 * @param {*} response 
 */
exports.nextStoryPrompt = (request, response) => {
    const { userAction } = request.body;
    const nextStory = generateNextStory(userAction);
    const result = extractResult(nextStory);
    const choices = extractChoices(nextStory);

    if (choices.length === 0) {
        // If there are no choices, the story is over
        response.json({
            result: result,
            end: true
        });
    } else {
        // If there are choices, the story continues
        response.json({
            result: result,
            choices: choices
        });
    }
};
