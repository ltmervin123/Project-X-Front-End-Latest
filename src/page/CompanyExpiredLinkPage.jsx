import React from "react";
import "../styles/ExpiredLink.css";
import Header from "../components/ExpiredLink/Header";
import CompanyExpiredLinkSection from "../components/CompanyExpiredLink/CompanyExpiredLinkSection.jsx";

function CompanyExpiredLinkPage() {
  return (
    <>
      <div className="container-fluid main-container login-page-container">
        <Header />
        <CompanyExpiredLinkSection />
      </div>
    </>
  );
}

export default CompanyExpiredLinkPage;
