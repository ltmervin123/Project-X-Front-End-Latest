import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export const getArchiveReferenceRequest = async () => {
  const USER = JSON.parse(localStorage.getItem("user")) || null;
  const token = USER?.token;
  const URL = `${API}/api/ai-referee/company-request-reference/get-archived-reference-request`;
  const response = await axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteReferenceRequest = async ({ referenceRequestId }) => {
  const USER = JSON.parse(localStorage.getItem("user")) || null;
  const token = USER?.token;
  const URL = `${API}/api/ai-referee/company-request-reference/hard-delete-reference-request`;
  const response = await axios.delete(URL, {
    data: { referenceRequestId },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const restoreReferenceRequest = async ({ referenceRequestId }) => {
  const USER = JSON.parse(localStorage.getItem("user")) || null;
  const token = USER?.token;
  const URL = `${API}/api/ai-referee/company-request-reference/restore-reference-request`;
  const response = await axios.post(
    URL,
    { referenceRequestId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
