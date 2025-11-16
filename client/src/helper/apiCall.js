// API helper for MediBooker
// Developed by Priyanshu

import axios from "axios";

// ✅ Backend base URL — MUST NOT include /api
const SERVER =
  process.env.REACT_APP_SERVER_DOMAIN || "https://medibooker-1.onrender.com";

// 🚀 axios base URL
axios.defaults.baseURL = SERVER;

const fetchData = async (endpoint) => {
  try {
    // 🔥 Always prepend "/api"
    const url = `/api${endpoint}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Unexpected error occurred" };
  }
};

export default fetchData;
