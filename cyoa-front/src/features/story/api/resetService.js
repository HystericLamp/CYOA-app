const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Makes an API call to /reset endpoint to reset the storyStep session
 * @param {*} endpoint - endpoint string "reset"
 */
export const postReset = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'POST',
            credentials: 'include',
        });

        const data = await response.json();
        console.log(data.message);

        return data;
    } catch (error) {
        console.error('Failed to reset story:', error);
    }
}