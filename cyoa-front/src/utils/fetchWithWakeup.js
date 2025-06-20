/**
 * Helper function that helps with dealing with loading when app waits for backend to wakeup
 * @param {*} fetchFn a function that uses fetch api to consume REST services
 * @param {*} param1 
 * @returns data from the fetch
 */
export async function fetchWithWakeup(fetchFn, { retries = 1, timeout = 15000 } = {}) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const result = await fetchFn({signal: controller.signal});
        clearTimeout(id);

        return result;
    } catch (error) {
        clearTimeout(id);

        if (retries > 0) {
            console.log(`Retrying... (${retries} retries left)`);
            await new Promise(res => setTimeout(res, 3000));
            return fetchWithWakeup(fetchFn, { retries: retries - 1, timeout });
        }

        // Fail if no retires left
        throw error;
    }
}