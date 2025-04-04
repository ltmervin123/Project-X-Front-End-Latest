import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import "../styles/LoginPage.css";
import "../styles/AiReferenceCheckVerification.css";
import Header from "../components/AiReferenceCheckVerification/Header";
import AiReferenceCheckVerificationForm from "../components/AiReferenceCheckVerification/AiReferenceCheckVerificationForm";
import axios from "axios";

function AiReferenceCheckVerificationPage() {
  const { token } = useParams();
  const API = process.env.REACT_APP_API_URL;
  const [isExpired, setIsExpired] = useState(false);
  const [refereeName, setRefereeName] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [refereeId, setRefereeId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [verifying, setVerifying] = useState(false);

  const validateSession = async () => {
    try {
      setVerifying(true);
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
      }
    } catch (error) {
      setIsExpired(true);
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    if (window.location.href.indexOf("#_=_") > 0) {
      window.location = window.location.href.replace(/#.*/, "");
    }

    validateSession();
  }, []);

  if (verifying) {
    return <div>Verifying link....</div>;
  }

  // If expired, navigate to "/reference-expired-link"
  if (isExpired) {
    return <Navigate to="/reference-expired-link" />;
  }

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

export default AiReferenceCheckVerificationPage;
