import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export const logoutCompany = async (companyId) => {
  const USER = JSON.parse(localStorage.getItem("user")) || null;
  const token = USER?.token;
  const URL = `${API}/api/ai-referee/auth/company-logout/${companyId}`;
  const response = await axios.post(
    URL,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.status;
};
