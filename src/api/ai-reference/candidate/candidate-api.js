import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export const addCandidate = async (user, payload) => {
  const token = user?.token || null;
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

export const sendCandidateReminder = async (params) => {
  const { token = null } = params?.user;
  const { candidateId = null } = params;
  const URL = `${API}/api/ai-referee/company-candidates/send-candidate-reminder/${candidateId}`;
  const response = await axios.post(
    URL,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const checkCandidateReminder = async (params) => {
  const { token = null } = params?.user;
  const { candidateId = null } = params;
  const URL = `${API}/api/ai-referee/company-candidates/check-candidate-reminder/${candidateId}`;
  const response = await axios.get(URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.hasReminder;
};

export const deleteCandidate = async (params) => {
  const { token = null } = params?.user;
  const { candidateId = null } = params;
  const URL = `${API}/api/ai-referee/company-candidates/delete-candidate-by-id/${candidateId}`;
  await axios.delete(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCandidate = async (params) => {
  const { token = null } = params?.user;
  const { candidateId, payload } = params;
  const URL = `${API}/api/ai-referee/company-candidates/update-candidate-by-id/${candidateId}`;
  await axios.put(URL, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCandidateStatus = async (params) => {
  const token = params?.user?.token;
  const payload = params?.payload || {};
  const URL = `${API}/api/ai-referee/company-candidates/update-candidate-status`;
  const response = await axios.put(
    URL,
    { payload },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const submitReferenceDetails = async (params) => {
  const token = params?.token || null;
  const payload = params?.payload || {};
  const URL = `${API}/api/candidate-referee/create-reference-request`;
  const response = await axios.post(URL, payload, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const verifyApplicantLink = async (params) => {
  const token = params?.token || null;
  const URL = `${API}/api/candidate-referee/verify-candidate-link`;
  const response = await axios.post(
    URL,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const verifyCaptchaToken = async (params) => {
  const captchaToken = params?.captchaToken || null;

  const URL = `${API}/api/candidate-referee/verify-captcha-token`;
  const response = await axios.post(
    URL,
    { captchaToken },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
