import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  socket,
  connectSocket,
  disconnectSocket,
} from "../../utils/socket/socketSetup";

const RequireAuthVerifyReferee = () => {
  const API = process.env.REACT_APP_API_URL;
  const token = sessionStorage.getItem("token");
  const referenceData = sessionStorage.getItem("referenceData");
  const [isSessionValid, setIsSessionValid] = useState(null);

  useEffect(() => {
    const validateSession = async () => {
      const URL = `${API}/api/ai-referee/reference/verify-reference-link`;
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
          connectSocket(token);
          const { companyId } = response.data;
          socket.emit("joinRoom", { companyId });
          setIsSessionValid(true);
        }
      } catch (error) {
        setIsSessionValid(false); // Mark as invalid
      }
    };

    validateSession();
    return () => {
      socket.removeAllListeners();
      disconnectSocket();
    };
  }, []);

  if (isSessionValid === null) {
    return <div>Verifying session...</div>;
  }

  return isSessionValid ? (
    <Outlet />
  ) : (
    <Navigate to="/reference-expired-link" />
  );
};

export default RequireAuthVerifyReferee;
