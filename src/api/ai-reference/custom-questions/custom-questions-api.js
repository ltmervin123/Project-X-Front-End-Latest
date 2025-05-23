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
