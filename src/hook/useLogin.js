import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const API = process.env.REACT_APP_API_URL;
  const { dispatch } = useAuthContext();

  const login = async (email, password, service) => {
    try {
      const URL = getURL(service);
      setIsLoading(true);
      setError(null);
      //Request body
      const requestBody = { email, password };

      // Make POST request with axios
      const response = await axios.post(URL, requestBody, {
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.data;
      const user = {
        service: data.user.service,
        name: data.user.name,
        email: data.user.email,
        id: data.user._id,
        token: data.user.token,
      };
      if (response.status === 200) {
        dispatch({ type: "LOGIN", payload: user });
        sessionStorage.setItem("authenticated", true);
        return user;
      }
    } catch (err) {
      // Handle any error from the request
      const responseError = err.response
        ? err.response.data.message
        : "Login failed";

      console.error("error :", err.response);
      setError(responseError);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getURL = (service) => {
    switch (service) {
      case "AI_REFERENCE":
        return `${API}/api/ai-referee/auth/company-login`;
      case "MOCK_AI":
        return `${API}/api/user/auth/login`;
      default:
        return ``;
    }
  };

  return { login, isLoading, error };
};
