import React from "react";
import "../styles/PassChanged.css";
import Header from "../components/ExpiredLink/Header";
import ReferenceRequestEmailSentSection from "../components/ReferenceRequestEmailSent/ReferenceRequestEmailSentSection.jsx";
function ReferenceRequestEmailSentPage() {
  return (
    <>
      <div className="container-fluid main-container login-page-container">
        <Header />
        <ReferenceRequestEmailSentSection />
      </div>
    </>
  );
}

export default ReferenceRequestEmailSentPage;
