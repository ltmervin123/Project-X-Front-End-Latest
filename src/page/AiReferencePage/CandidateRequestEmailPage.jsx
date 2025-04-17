import React from "react";
import Header from "../../components/AiReference/Maindashboard/Components/Header.jsx";
import CandidateRequestEmailSection from "../../components/AiReference/Maindashboard/Components/CandidateRequestEmailSection.jsx";

function CandidateRequestEmailPage() {
  return (
    <>
      <div className="container-fluid main-container login-page-container">
        <Header />
        <CandidateRequestEmailSection />
      </div>
    </>
  );
}

export default CandidateRequestEmailPage;
