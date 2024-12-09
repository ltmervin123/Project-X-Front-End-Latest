import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const API = process.env.REACT_APP_API_URL;
  const URL = `${API}/api/user/auth/login`;
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    try {
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
        name: data.user.name,
        email: data.user.email,
        id: data.user._id,
        token: data.user.token,
      };

      // Check if the response is successful
      if (response.status === 200) {
        // //Set the user to the local storage
        // localStorage.setItem("user", JSON.stringify(user));

        // Dispatch the user data to context or handle login state
        dispatch({ type: "LOGIN", payload: user });
        return true;
      }
    } catch (err) {
      // Handle any error from the request
      const responseError = err.response
        ? err.response.data.error
        : "Login failed";
      setError(responseError);
      console.log("Error ", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
