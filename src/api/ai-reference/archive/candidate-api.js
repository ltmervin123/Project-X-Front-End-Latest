import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export const getArchiveCandidate = async () => {
  const USER = JSON.parse(localStorage.getItem("user")) || null;
  const token = USER?.token;
  const URL = `${API}/api/ai-referee/company-candidates/get-archive-candidate`;
  const response = await axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteCandidate = async ({ candidateIds }) => {
  const USER = JSON.parse(localStorage.getItem("user")) || null;
  const token = USER?.token;
  const URL = `${API}/api/ai-referee/company-candidates/delete-candidate`;
  const response = await axios.delete(URL, {
    data: { candidateIds },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const restoreCandidate = async ({ candidateIds }) => {
  const USER = JSON.parse(localStorage.getItem("user")) || null;
  const token = USER?.token;
  const URL = `${API}/api/ai-referee/company-candidates/restore-candidate`;
  const response = await axios.post(
    URL,
    { candidateIds },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
