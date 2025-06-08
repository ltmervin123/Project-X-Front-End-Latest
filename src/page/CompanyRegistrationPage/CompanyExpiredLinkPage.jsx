import React from "react";
import "../../styles/ExpiredLink.css";
import Header from "../../components/Company/CompanyRegistration/Header";
import CompanyExpiredLinkSection from "../../components/Company/CompanyExpiredLink/CompanyExpiredLinkSection";

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
