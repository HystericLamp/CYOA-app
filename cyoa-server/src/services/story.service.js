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