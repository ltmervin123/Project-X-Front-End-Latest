import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export const getArchiveReferenceRequest = async (user) => {
  const { token = null } = user;
  const URL = `${API}/api/ai-referee/company-request-reference/get-archived-reference-request`;
  const response = await axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteReferenceRequest = async ({ user, referenceRequestId }) => {
  const { token = null } = user;
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

export const restoreReferenceRequest = async ({ user, referenceRequestId }) => {
  const { token = null } = user;
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
