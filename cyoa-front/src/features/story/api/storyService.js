const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Function that makes a GET request to /story that starts the story intro scenario and choices
 * @param {*} endpoint - endpoint string "story"
 * @returns an introductory scenario and 3 choices
 */
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

/**
 * Function that makes a POST request to /story that gets the next story scenario and choices
 * based on userAction
 * @param {*} endpoint - endpoint string "story"
 * @param {*} userAction - string of the choice user has chosen
 * @returns next story scenario and choices
 */
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