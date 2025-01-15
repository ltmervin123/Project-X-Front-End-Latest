import { useAnalyticsContext } from "./useAnalyticsContext";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useAnalytics = () => {
  const [isloaading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const { dispatch } = useAnalyticsContext();
  const API = process.env.REACT_APP_API_URL;
  const URL = `${API}/api/interview/get-feedback`;

  const getAnalytics = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.data.feedbacks;
      if (response.status === 200) {
        dispatch({ type: "SET_ANALYTICS", payload: data });
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addAnalytics = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.data.feedback;
      if (response.status === 200) {
        dispatch({ type: "CREATE_ANALYTICS", payload: data });
      }
    } catch (err) {
      console.error(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return { getAnalytics, addAnalytics, isloaading, error };
};
