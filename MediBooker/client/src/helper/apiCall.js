// API helper for MediBooker
// Developed by Priyanshu

import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(endpoint, {
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
