import axios from "axios";

const DEEPSEEK_API_URL = "https://api.deepseek.com"; // Replace with the actual API URL
const API_KEY = process.env.DEEPSEEK_API_KEY;

const deepseekApi = axios.create({
  baseURL: DEEPSEEK_API_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

export const searchDeepSeek = async (query) => {
  try {
    const response = await deepseekApi.post("/search", { query });
    return response.data; // Adjust based on the API response structure
  } catch (error) {
    console.error("Error fetching data from DeepSeek:", error);
    throw error; // Rethrow or handle the error as needed
  }
};
