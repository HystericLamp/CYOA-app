const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.STORY_TELLER_KEY,
});

module.exports = openai;