import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export const getArchiveReferenceQuestion = async (user) => {
  const { token = null } = user;
  const URL = `${API}/api/ai-referee/company-reference-questions/archive/get-archive-reference-questions`;
  const response = await axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteReferenceQuestion = async ({ user, questionIds }) => {
  const { token = null } = user;
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

export const restoreReferenceQuestion = async ({ user, questionIds }) => {
  const { token = null } = user;
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
