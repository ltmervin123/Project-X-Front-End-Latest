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
      //Request body
      const requestBody = { name, email, password };

      // Make POST request with axios
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

      // Check if the response is successful
      if (response.status === 201) {
        //Set the user to the local storage
        localStorage.setItem("user", JSON.stringify(user));

        // Dispatch the user data to context or handle login state
        dispatch({ type: "LOGIN", payload: user });
      }
      return true;
    } catch (err) {
      // Handle any error from the request
      setError(err.response ? err.response.data.error : "Signup failed");
      return false;
    } finally {
      // Set loading to false after the request completes
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
