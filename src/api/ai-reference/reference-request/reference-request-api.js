import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export const fetchReferenceByReferenceId = async ({ queryKey }) => {
  const [_key, { referenceId, refereeId, token }] = queryKey;
  const URL = `${API}/api/ai-referee/company-request-reference/get-reference/${referenceId}/${refereeId}`;
  const response = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.referenceDetails;
};
