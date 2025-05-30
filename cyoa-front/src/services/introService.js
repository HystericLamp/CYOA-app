const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getIntro = async () => {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
        throw new Error('Backend app is unavailable');
    }

    const data = await response.json();
    return data;
};