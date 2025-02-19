import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const RequireAuthVerifyReferee = () => {
  const API = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const [isSessionValid, setIsSessionValid] = useState(null); // Initially null

  useEffect(() => {
    const validateSession = async () => {
      const URL = `${API}/api/ai-referee/verify-reference-link`;
      try {
        const response = await axios.post(
          URL,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setIsSessionValid(true);
        }
      } catch (error) {
        setIsSessionValid(false); // Mark as invalid
      }
    };

    validateSession();
  }, []);

  if (isSessionValid === null) {
    return <div>Verifying session...</div>; // Show a loading state
  }

  return isSessionValid ? (
    <Outlet />
  ) : (
    <Navigate to="/reference-expired-link" />
  );
};

export default RequireAuthVerifyReferee;
