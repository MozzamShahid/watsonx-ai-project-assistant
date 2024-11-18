// Using Axios
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // adjust port as needed

export const watsonxApi = {
    // Chat completion endpoint
    sendMessage: async (message) => {
        try {
            const response = await axios.post(`${BASE_URL}/chat/completions`, {
                message: message
            });
            return response.data;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    },

    // Project analysis endpoint
    analyzeProject: async (projectData) => {
        try {
            const response = await axios.post(`${BASE_URL}/analyze-project`, projectData);
            return response.data;
        } catch (error) {
            console.error('Error analyzing project:', error);
            throw error;
        }
    }
};

// Using Fetch
export const watsonxApiFetch = {
    sendMessage: async (message) => {
        try {
            const response = await fetch(`${BASE_URL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    },

    analyzeProject: async (projectData) => {
        try {
            const response = await fetch(`${BASE_URL}/analyze-project`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error analyzing project:', error);
            throw error;
        }
    }
};