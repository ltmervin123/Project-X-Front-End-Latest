import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [message, setMessage] = useState(null);
  const API = process.env.REACT_APP_API_URL;
  const { dispatch } = useAuthContext();
  const SERVICE = ["AI_REFERENCE", "MOCK_AI"];

  const signup = async (userDetail, service) => {
    setIsLoading(true);
    setError(null);

    switch (service) {
      case SERVICE[0]:
        return await aiReferenceSignUp(userDetail);
      case SERVICE[1]:
        return await mockAiSignUp(userDetail);
      default:
        return null;
    }
  };

  const aiReferenceSignUp = async (userDetail) => {
    try {
      const URL = `${API}/api/ai-referee/auth/company-registration`;
      const {
        name,
        email,
        password,
        location,
        size,
        industry,
        annualHiringVolume,
        firstName,
        lastName,
        positionTitle,
      } = userDetail;
      const companyDetails = {
        name,
        email,
        password,
        location,
        size,
        industry,
        annualHiringVolume,
      };
      const personInChargeDetails = { firstName, lastName, positionTitle };

      const response = await axios.post(URL, {
        companyDetails,
        personInChargeDetails,
      });
      setStatus(response.status);
      setMessage(response.data.message);
    } catch (err) {
      setStatus(err.response ? err.response.status : 500);
      setError(err.response ? err.response.data.message : "Signup failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const mockAiSignUp = async (userDetail) => {
    try {
      const URL = `${API}/api/user/auth/signup`;
      const { name, email, password } = userDetail;
      const requestBody = { name, email, password };
      const response = await axios.post(URL, requestBody, {
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.data;

      const user = {
        name: data.user.name,
        email: data.user.email,
        id: data.user._id,
        token: data.user.token,
      };

      if (response.status === 201) {
        localStorage.setItem("user", JSON.stringify(user));

        dispatch({ type: "LOGIN", payload: user });
      }
      return true;
    } catch (err) {
      setError(err.response ? err.response.data.message : "Signup failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error, message, status };
};
