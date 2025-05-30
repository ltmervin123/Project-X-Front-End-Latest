import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export const getArchiveJobs = async (user) => {
  const { token = null } = user;
  const URL = `${API}/api/ai-referee/company-jobs/get-archived-jobs`;
  const response = await axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteJobs = async ({ user, jobIds }) => {
  const { token = null } = user;
  const URL = `${API}/api/ai-referee/company-jobs/hard-delete-job`;
  const response = await axios.delete(URL, {
    data: { jobIds },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const restoreJobs = async ({ user, jobIds }) => {
  const { token = null } = user;
  const URL = `${API}/api/ai-referee/company-jobs/restore-job`;
  const response = await axios.post(
    URL,
    { jobIds },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
