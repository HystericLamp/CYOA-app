const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getIntro = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}`);
        if (!response.ok) {
            throw new Error('Backend app is unavailable');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('GET Error: ', error)
        throw error;
    }
};