import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export const fetchReferenceByReferenceId = async (params) => {
  const { referenceId, refereeId, token } = params;
  const URL = `${API}/api/ai-referee/company-request-reference/get-reference/${referenceId}/${refereeId}`;
  const response = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.referenceDetails;
};

export const getReferences = async (user) => {
  const { id, token } = user;
  const URL = `${API}/api/ai-referee/company-request-reference/get-reference-request-by-companyId/${id}`;
  const response = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.reference;
};

export const getCompletedReferences = async (user) => {
  const { id, token } = user;
  const URL = `${API}/api/ai-referee/company-request-reference/get-completed-reference/${id}`;
  const response = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.result;
};

export const deleteReference = async (params) => {
  const { token = null } = params?.user;
  const { referenceId } = params;
  const URL = `${API}/api/ai-referee/company-request-reference/delete-reference-request/${referenceId}`;
  await axios.delete(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
