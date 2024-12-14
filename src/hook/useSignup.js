import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const API = process.env.REACT_APP_API_URL;
  const URL = `${API}/api/user/auth/signup`;
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
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

  return { signup, isLoading, error };
};
