import React from "react";
import "../styles/ReferenceVerification.css";
import Header from "../components/ReferenceVerification/Header";
import ReferenceVerificationSection from "../components/ReferenceVerification/ReferenceVerificationSection.jsx";

function ReferenceVerificationPage() {
  return (
    <>
      <div className="container-fluid mock-background">
        <Header />
        <ReferenceVerificationSection />
      </div>
    </>
  );
}

export default ReferenceVerificationPage;
