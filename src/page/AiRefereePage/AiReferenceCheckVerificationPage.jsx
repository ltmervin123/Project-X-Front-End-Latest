import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import "../../styles/LoginPage.css";
import "../../styles/AiReferenceCheckVerification.css";
import Header from "../../components/AiReferenceCheckVerification/Header.jsx";
import AiReferenceCheckVerificationForm from "../../components/AiReferenceCheckVerification/AiReferenceCheckVerificationForm.jsx";
import { verifyReferenceLink } from "../../api/ai-reference/reference-request/reference-request-api.js";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import Captcha from "../../components/ReCaptcha/Captcha.jsx";
import { verifyCaptchaToken } from "../../api/ai-reference/candidate/candidate-api.js";

function AiReferenceCheckVerificationPage() {
  const { token } = useParams();
  const [isExpired, setIsExpired] = useState(false);
  const [refereeName, setRefereeName] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [refereeId, setRefereeId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isVerifyReferenceLink, setIsVerifyLink] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [isVerifyCaptcha, setIsVerifyCaptcha] = useState(false);

  const validateSession = async () => {
    try {
      const response = await verifyReferenceLink({ token });

      if (response.status === 200) {
        sessionStorage.setItem("token", token);
        setCandidateName(response.data.candidateName);
        setRefereeName(response.data.refereeName);
        setReferenceId(response.data.referenceId);
        setRefereeId(response.data.refereeId);
        setCompanyId(response.data.companyId);
        setSelectedLanguage(response.data?.selectedLanguage || "English");
        setIsVerifyLink(true);
      }
    } catch (error) {
      setIsExpired(true);
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
    if (!captchaToken) {
      return;
    }
    handleVerifyCaptchaToken();
  }, [captchaToken]);

  useEffect(() => {
    validateSession();
  }, []);

  const onChange = (token) => {
    setCaptchaToken(token);
  };
  // If the link is valid but captcha is not verified, show the captcha
  if (isVerifyReferenceLink && !captchaToken) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Captcha onChange={onChange} captchaToken={captchaToken} />
      </div>
    );
  }

  if (isVerifyReferenceLink && isVerifyCaptcha) {
    return (
      <>
        <div className=" login-page-container AiReferenceCheckVerification-page-container">
          <Header />
          <AiReferenceCheckVerificationForm
            refereeName={refereeName}
            referenceId={referenceId}
            candidateName={candidateName}
            refereeId={refereeId}
            companyId={companyId}
            selectedLanguage={selectedLanguage}
          />
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

export default AiReferenceCheckVerificationPage;
