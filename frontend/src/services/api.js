import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchEpisodes = async (filters, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/episodes`, {
      params: {
        ...filters, // Include filter parameters
        page,
        limit, // Pagination parameters
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return { episodes: [], totalEpisodes: 0, currentPage: 1, totalPages: 1 };
  }
};
