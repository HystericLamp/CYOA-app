const { openai } = require('../config/openai');

exports.generatePromptResponse = async (prompt) => {
    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo'
    })
}