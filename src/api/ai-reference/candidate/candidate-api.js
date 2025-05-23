import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export const addCandidate = async (payload) => {
  const USER = JSON.parse(localStorage.getItem("user")) || null;
  const token = USER?.token;
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

export const getCandidate = async (user) => {
  const { id, token } = user;
  const URL = `${API}/api/ai-referee/company-candidates/get-candidates-by-companyId/${id}`;
  const response = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.candidates;
};

export const sendCandidateReminder = async (candidateId) => {
  const USER = JSON.parse(localStorage.getItem("user")) || null;
  const token = USER?.token;
  const URL = `${API}/api/ai-referee/company-candidates/send-candidate-reminder/${candidateId}`;
  const response = await axios.post(
    URL,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const checkCandidateReminder = async (candidateId) => {
  const USER = JSON.parse(localStorage.getItem("user")) || null;
  const token = USER?.token;
  const URL = `${API}/api/ai-referee/company-candidates/check-candidate-reminder/${candidateId}`;
  const response = await axios.get(URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.hasReminder;
};
