import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export const updateProfile = async (params) => {
  const { token = null } = params?.user;
  const { updatedData } = params;
  const URL = `${API}/api/ai-referee/company-profile`;
  await axios.post(URL, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCulture = async (params) => {
  const { token = null } = params?.user;
  const { selectedCulture } = params;
  const URL = `${API}/api/ai-referee/company-culture`;
  await axios.put(
    URL,
    { selectedCulture },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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
