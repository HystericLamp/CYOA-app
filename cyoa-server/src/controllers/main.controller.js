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
exports.generateIntroStory = async(request, response) => {
    const scenario = getRandomScenario();
    const story = await generateIntro(scenario);
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
exports.nextStoryPrompt = async (request, response) => {
    const { userAction } = request.body;

    // Initialize session tracking if not already set
    if (!request.session.storySteps) {
        request.session.storySteps = [];
    }

    request.session.storySteps.push(userAction);
    const storyStep = request.session.storySteps.length + 1;

    const nextStory = await generateNextStory(userAction, storyStep);
    const result = extractResult(nextStory);
    const choices = extractChoices(nextStory);

    if (choices.length === 0) {
        // If there are no choices, the story is over
        response.json({
            result: result,
            end: true,
            path: request.session.storySteps
        });
    } else {
        // If there are choices, the story continues
        response.json({
            result: result,
            choices: choices,
            path: request.session.storySteps
        });
    }
};
