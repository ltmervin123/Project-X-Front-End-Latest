import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export const addCandidate = async (user, payload) => {
  const token = user?.token || null;
  const URL = `${API}/api/ai-referee/company-candidates/create-candidate`;
  const response = await axios.post(
    URL,
    { payload },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getProfile = async (user) => {
  const { token } = user;
  const URL = `${API}/api/ai-referee/company-profile`;
  const response = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.companyInfo;
};
