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
  const [isExpired, setIsExpired] = useState(false); // Track expired state

  const validateSession = async () => {
    try {
      const URL = `${API}/api/ai-referee/verify-reference-link`;
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
        localStorage.setItem("token", token);
      }
    } catch (error) {
      setIsExpired(true); // Set expired state if an error occurs
    }
  };

  useEffect(() => {
    if (window.location.href.indexOf("#_=_") > 0) {
      window.location = window.location.href.replace(/#.*/, "");
    }

    validateSession();
  }, []);

  // If expired, navigate to "/reference-expired-link"
  if (isExpired) {
    return <Navigate to="/reference-expired-link" />;
  }

  return (
    <div className="container-fluid mock-background">
      <Header />
      <AiReferenceCheckVerificationForm />
    </div>
  );
}

export default AiReferenceCheckVerificationPage;
