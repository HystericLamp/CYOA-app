const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.STORY_TELLER_KEY,
});

const MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

module.exports = openai;