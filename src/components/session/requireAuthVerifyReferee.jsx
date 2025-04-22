import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  socket,
  connectSocket,
  disconnectSocket,
} from "../../utils/socket/socketSetup";
import { Spinner, Container, Row, Col } from "react-bootstrap";

const RequireAuthVerifyReferee = () => {
  const API = process.env.REACT_APP_API_URL;
  const token = sessionStorage.getItem("token");
  const referenceData = sessionStorage.getItem("referenceData");
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

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
        setIsExpired(true);
      }
    };

    validateSession();
    return () => {
      socket.removeAllListeners();
      disconnectSocket();
    };
  }, []);

  if (isSessionValid) {
    return <Outlet />;
  }

  if (isExpired) {
    return <Navigate to="/reference-expired-link" />;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="text-center">
        <Col>
          <Spinner
            animation="border"
            variant="primary"
            role="status"
            style={{ width: "5rem", height: "5rem" }}
          />
          <p className="mt-3">Verifying link, please wait...</p>
        </Col>
      </Row>
    </Container>
  );
};

export default RequireAuthVerifyReferee;
