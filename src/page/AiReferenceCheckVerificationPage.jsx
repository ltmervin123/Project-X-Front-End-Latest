import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Navigate } from "react-router-dom";
import "../styles/LoginPage.css";
import "../styles/AiReferenceCheckVerification.css";
import Header from "../components/AiReferenceCheckVerification/Header";
import AiReferenceCheckVerificationForm from "../components/AiReferenceCheckVerification/AiReferenceCheckVerificationForm";
import axios from "axios";
function AiReferenceCheckVerificationPage() {
  const { token } = useParams();
  const API = process.env.REACT_APP_API_URL;
  const URL = `${API}/api/user/auth/verify-session`;

  const validateSession = async () => {
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
        localStorage.setItem("token", token);
      }
    } catch (error) {
      <Navigate to="/reference-expired-link" />;
    }
  };

  useEffect(() => {
    // Remove #_=_ from the URL
    if (window.location.href.indexOf("#_=_") > 0) {
      window.location = window.location.href.replace(/#.*/, "");
    }

    const validateTokenWhenRender = async () => {
      await validateSession();
    };

    validateTokenWhenRender();
  }, []);

  return (
    <>
      <div className="container-fluid mock-background">
        <Header />
        <AiReferenceCheckVerificationForm />
      </div>
    </>
  );
}

export default AiReferenceCheckVerificationPage;
