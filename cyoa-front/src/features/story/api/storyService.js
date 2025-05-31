const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// I am making multiple calls for this. IDK why.
export const getStoryIntro = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error('Could not make a story introduction scenario');
        }

        const data = await response.json();
        return data;
    } catch(error) {
        console.error('GET Error: ', error)
        throw error;
    }
}

export const postNextStoryPrompt = async (endpoint, userAction) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userAction)
        });

        if (!response.ok) {
            throw new Error(`POST failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('POST Error: ', error)
        throw error;
    }
}