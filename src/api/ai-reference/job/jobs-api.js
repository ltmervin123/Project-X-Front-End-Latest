import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export const addJob = async (user, payload) => {
  const token = user?.token || null;
  const URL = `${API}/api/ai-referee/company-jobs/create-job`;
  const response = await axios.post(URL, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.createdJob;
};

export const getJobs = async (user) => {
  const { id, token } = user;
  const URL = `${API}/api/ai-referee/company-jobs/get-jobs-by-id/${id}`;
  const response = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.jobs;
};

export const updateVacancies = async (payload) => {
  const USER = JSON.parse(localStorage.getItem("user")) || null;
  const token = USER?.token;
  const URL = `${API}/api/ai-referee/company-jobs/update-vacancies`;
  const response = await axios.put(URL, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteJob = async (user, jobId) => {
  const { token } = user;
  const URL = `${API}/api/ai-referee/company-jobs/delete-job-by-id/${jobId}`;
  const response = await axios.delete(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateJob = async (user, jobId, payload) => {
  const { token } = user;
  const URL = `${API}/api/ai-referee/company-jobs/update-job-by-id/${jobId}`;
  const response = await axios.put(URL, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
