import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export const addJob = async (payload) => {
  const USER = JSON.parse(localStorage.getItem("user")) || null;
  const token = USER?.token;
  const URL = `${API}/api/ai-referee/company-jobs/create-job`;
  const response = await axios.post(URL, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
