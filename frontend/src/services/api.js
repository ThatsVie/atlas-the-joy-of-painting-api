import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchEpisodes = async (filters) => {
    try {
        const response = await axios.get(`${API_URL}/episodes`, { params: filters });
        return response.data;
    } catch (error) {
        console.error('Error fetching episodes:', error);
        return [];
    }
};
