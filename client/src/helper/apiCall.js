// API helper for MediBooker
// Developed by Priyanshu

import axios from "axios";

// Backend base URL on Render
axios.defaults.baseURL =
  process.env.REACT_APP_SERVER_DOMAIN || "https://medibooker-1.onrender.com";

// THIS IS THE IMPORTANT FIX ↓↓↓
const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`/api${endpoint}`, {   // <<<<<< ADD /api HERE
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "An unexpected error occurred." };
  }
};

export default fetchData;
