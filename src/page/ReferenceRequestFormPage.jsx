import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import "../styles/ReferenceRequestForm.css";
import Header from "../components/ReferenceRequestFormSubmit/Header";
import ReferenceRequestForm from "../components/ReferenceRequestFormSubmit/ReferenceRequestForm.jsx";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

function ReferenceRequestFormPage() {
  const { token } = useParams();
  const API = process.env.REACT_APP_API_URL;
  const [isVerify, setIsVerify] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  //verify if the token is valid and not expired
  const verifyToken = async () => {
    try {
      const URL = `${API}/api/candidate-referee/verify-candidate-link`;
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
        sessionStorage.setItem(
          "candidateData",
          JSON.stringify(response.data?.decoded)
        );
        sessionStorage.setItem("candidateToken", token);
        setIsVerify(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setIsExpired(true);
      } else {
        console.error("Something went wrong:", error.message);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  if (isVerify) {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center flex-column h-100">
          <Header />
          <ReferenceRequestForm />
        </div>
      </>
    );
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
}

export default ReferenceRequestFormPage;
