import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import "../styles/LoginPage.css";
import "../styles/AiReferenceCheckVerification.css";
import Header from "../components/AiReferenceCheckVerification/Header";
import AiReferenceCheckVerificationForm from "../components/AiReferenceCheckVerification/AiReferenceCheckVerificationForm";
import axios from "axios";
import { Spinner, Container, Row, Col } from "react-bootstrap";

function AiReferenceCheckVerificationPage() {
  const { token } = useParams();
  const API = process.env.REACT_APP_API_URL;
  const [isExpired, setIsExpired] = useState(false);
  const [refereeName, setRefereeName] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [refereeId, setRefereeId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [isVerify, setIsVerify] = useState(false);

  const validateSession = async () => {
    try {
      const URL = `${API}/api/ai-referee/reference/verify-reference-link`;
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
        sessionStorage.setItem("token", token);
        setCandidateName(response.data.candidateName);
        setRefereeName(response.data.refereeName);
        setReferenceId(response.data.referenceId);
        setRefereeId(response.data.refereeId);
        setCompanyId(response.data.companyId);
        setIsVerify(true);
      }
    } catch (error) {
      setIsExpired(true);
    }
  };

  useEffect(() => {
    if (window.location.href.indexOf("#_=_") > 0) {
      window.location = window.location.href.replace(/#.*/, "");
    }

    validateSession();
  }, []);

  if (isVerify) {
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
          />
        </div>
      </>
    );
  }

  // If expired, navigate to "/reference-expired-link"
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
