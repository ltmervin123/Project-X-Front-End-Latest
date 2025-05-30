import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export const getAgency = async (user = {}) => {
  const token = user?.token || null;
  const URL = `${API}/api/ai-referee/agency/get/company`;
  const response = await axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.agencies;
};

export const createAgency = async (user = {}, agencyData = {}) => {
  const token = user?.token || null;
  const URL = `${API}/api/ai-referee/agency/create`;
  const response = await axios.post(
    URL,
    { agencyData },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updateAgency = async ({
  agencyId = null,
  user = {},
  updatedData = {},
}) => {
  const token = user?.token || null;
  const URL = `${API}/api/ai-referee/agency/update/${agencyId}`;
  const response = await axios.put(
    URL,
    { updatedData },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteAgency = async (user = {}, agencyId = null) => {
  const token = user?.token || null;
  const URL = `${API}/api/ai-referee/agency/delete/${agencyId}`;
  const response = await axios.delete(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
