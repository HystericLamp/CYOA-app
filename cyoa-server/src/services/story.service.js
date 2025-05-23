const { openai, MODEL } = require('../config/openai');

exports.generatePromptResponse = async (prompt) => {
    const completion = await openai.chat.completions.create({
        model: MODEL,
        messages: [{ role: 'user', content: prompt }],
    })
    
    return completion.choices[0].message.content;
}