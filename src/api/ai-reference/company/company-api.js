import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export const updateProfile = async (params) => {
  const { token = null } = params?.user;
  const { updatedData } = params;
  console.log("Updating profile with data:", updatedData);
  const URL = `${API}/api/ai-referee/company-profile`;
  await axios.post(URL, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
