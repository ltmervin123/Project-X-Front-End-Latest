import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

export const useGoogleAuth = () => {
  const [googleError, setGoogleError] = useState(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(null);
  const API = process.env.REACT_APP_API_URL;
  const URL = `${API}/api/user/auth/google-login`; // need to be change
  const { dispatch } = useAuthContext();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsGoogleLoading(true);
        setGoogleError(null);

        //Extract the token from the response
        const accessToken = tokenResponse?.access_token;
        // Request body payload
        const requestBody = { accessToken };

        //Authenticate the user with the backend
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
        if (response.status === 200) {
          dispatch({ type: "LOGIN", payload: user });
          return true;
        }
      } catch (err) {
        //Handle any error from the request
        const responseError = err.response
          ? err.response.data.message
          : "Login failed";

        console.error("error :", err.response);
        setGoogleError(responseError);
        return false;
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google login failed", error);
      // Handle login errors here
    },
  });

  const errorSetter = () => {
    setGoogleError(null);
  };

  return { isGoogleLoading, googleError, googleLogin, errorSetter };
};
