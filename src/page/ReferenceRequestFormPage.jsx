import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import "../styles/ReferenceRequestForm.css";
import Header from "../components/ReferenceRequestFormSubmit/Header";
import ReferenceRequestForm from "../components/ReferenceRequestFormSubmit/ReferenceRequestForm.jsx";
import {
  verifyApplicantLink,
  verifyCaptchaToken,
} from "../api/ai-reference/candidate/candidate-api";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import Captcha from "../components/ReCaptcha/Captcha.jsx";

function ReferenceRequestFormPage() {
  const { token } = useParams();
  const [isVerifyLink, setIsVerifyLink] = useState(false);
  const [isExpiredLink, setIsExpiredLink] = useState(false);
  const [isVerifyCaptcha, setIsVerifyCaptcha] = useState(false);

  const [captchaToken, setCaptchaToken] = useState(null);
  const handleVerifyLink = async () => {
    try {
      const response = await verifyApplicantLink({ token });

      if (response.status === 200) {
        sessionStorage.setItem(
          "candidateData",
          JSON.stringify(response.data?.decoded)
        );
        sessionStorage.setItem("candidateToken", token);
        setIsVerifyLink(true);
      }
    } catch (error) {
      setIsExpiredLink(true);
    }
  };

  const handleVerifyCaptchaToken = async () => {
    try {
      const response = await verifyCaptchaToken({ captchaToken });

      if (response.data.success) {
        setIsVerifyCaptcha(true);
      }
    } catch (error) {
      setCaptchaToken(null);
      console.error("Captcha verification failed:", error);
    }
  };

  useEffect(() => {
    handleVerifyLink();
  }, []);

  useEffect(() => {
    if (!captchaToken) {
      return;
    }
    handleVerifyCaptchaToken();
  }, [captchaToken]);

  const onChange = (token) => {
    setCaptchaToken(token);
  };

  // If the link is valid but captcha is not verified, show the captcha
  if (isVerifyLink && !captchaToken) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Captcha onChange={onChange} captchaToken={captchaToken} />
      </div>
    );
  }

  // If the link is valid and captcha is verified, show the form
  if (isVerifyLink && isVerifyCaptcha) {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center flex-column h-100">
          <Header />
          <ReferenceRequestForm />
        </div>
      </>
    );
  }

  // If the link is expired, redirect to the expired link page
  if (isExpiredLink) {
    return <Navigate to="/reference-expired-link" />;
  }

  // While verifying the link and captcha token, show a loading spinner
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
