import axios from "axios";
const API = process.env.REACT_APP_API_URL;
const USER = JSON.parse(localStorage.getItem("user")) || null;

export const getArchiveReferenceQuestion = async () => {
  const token = USER?.token;
  const URL = `${API}/api/ai-referee/company-reference-questions/archive/get-archive-reference-questions`;
  const response = await axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteReferenceQuestion = async ({ questionIds }) => {
  const token = USER?.token;
  const URL = `${API}/api/ai-referee/company-reference-questions/archive/delete-archive-reference-questions`;
  const response = await axios.delete(URL, {
    data: { questionIds },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const restoreReferenceQuestion = async ({ questionIds }) => {
  const token = USER?.token;
  const URL = `${API}/api/ai-referee/company-reference-questions/archive/restore-archive-reference-questions`;
  const response = await axios.post(
    URL,
    { questionIds },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
