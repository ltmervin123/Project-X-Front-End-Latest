import React, { useEffect } from "react";
import "../styles/LoginPage.css";
import '../styles/AiReferenceCheckVerification.css';
import Header from "../components/AiReferenceCheckVerification/Header";
import AiReferenceCheckVerificationForm from "../components/AiReferenceCheckVerification/AiReferenceCheckVerificationForm";

function AiReferenceCheckVerificationPage() {
  useEffect(() => {
    // Remove #_=_ from the URL
    if (window.location.href.indexOf("#_=_") > 0) {
      window.location = window.location.href.replace(/#.*/, "");
    }
  }, []);

  return (
    <>
      <div className="mock-background">
        <Header />
        <AiReferenceCheckVerificationForm />
      </div>
    </>
  );
}

export default AiReferenceCheckVerificationPage;
