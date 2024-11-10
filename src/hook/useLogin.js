import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const URL = "http://localhost:5000/api/user/auth/login";
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      //Request body
      const requestBody = { email, password };

      // Make POST request with axios
      const response = await axios.post(URL, requestBody, {
        headers: { "Content-Type": "application/json" },
      });

      const user = await response.data;

      // Check if the response is successful
      if (response.status === 200) {
        //Set the user to the local storage
        localStorage.setItem("user", JSON.stringify(user));

        // Dispatch the user data to context or handle login state
        dispatch({ type: "LOGIN", payload: user });
      }
    } catch (err) {
      // Handle any error from the request
      setError(err.response ? err.response.data.error : "Signup failed");
    } finally {
      // Set loading to false after the request completes
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
