import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_SERVER_DOMAIN || "https://medibooker-1.onrender.com";

const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`/api${endpoint}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Unexpected error" };
  }
};

export default fetchData;
