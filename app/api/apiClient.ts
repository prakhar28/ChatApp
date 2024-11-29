// api/apiClient.ts
export const BASE_URL = "http://dummy-chat-server.tribechat.pro/api";

// Common headers for all API requests
export const defaultHeaders = {
    Accept: 'application/json',
    "Content-Type": "application/json",
};

// Generic API fetch function
export const apiClient = async (endpoint: string, method: string = "GET", body?: object) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`API Error: ${error}`);
        throw error;
    }
};

