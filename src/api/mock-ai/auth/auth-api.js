import { useAuthContext } from "../../../hook/useAuthContext";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const HandleSession = async () => {
  const { user } = useAuthContext();
  const URL = `${API}/api/user/auth/verify-session`;
  const response = await axios.post(
    URL,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
    }
  );
  return response.data;
};

export default HandleSession;
