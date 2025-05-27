import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export const getCustomReferenceQuestions = async (user) => {
  const { id, token } = user;
  const URL = `${API}/api/ai-referee/company-reference-questions/get-reference-questions/${id}`;
  const response = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.questions;
};

export const deleteCustomReferenceQuestion = async (user, questionId) => {
  const { id, token } = user;
  const URL = `${API}/api/ai-referee/company-reference-questions/delete-reference-questions/${questionId}/${id}`;
  await axios.delete(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCustomReferenceQuestion = async (param) => {
  const { user, questionId, payload } = param;
  const { token } = user;
  const URL = `${API}/api/ai-referee/company-reference-questions/update-reference-questions/${questionId}`;
  await axios.put(
    URL,
    { payload },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
